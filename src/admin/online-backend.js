// Editor revisions hash the exact JSON bytes with SHA256; deployment IDs separately use Git SHA1.
const validSha = (value) => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value);

/** Keep the revision that was actually opened, even when a later list refresh sees newer data. */
export function createOnlineBackend(ProxyBackend) {
  return class OnlineBackend extends ProxyBackend {
    constructor(...args) {
      super(...args);
      this.fileRevisions = new Map();
    }

    authenticate() {
      const email =
        typeof document !== 'undefined'
          ? document.querySelector('[data-online-publish]')?.dataset.email
          : undefined;
      return Promise.resolve({
        login: email || 'administrator',
        name: 'Soltree',
        ...(email ? { email } : {}),
      });
    }

    async request(payload) {
      if (payload.action === 'persistEntry') {
        payload = {
          ...payload,
          params: {
            ...payload.params,
            expected: Object.fromEntries(
              payload.params.dataFiles.map((file) => [
                file.path,
                this.fileRevisions.get(file.path) ?? null,
              ]),
            ),
          },
        };
      }
      let result;
      try {
        result = await super.request(payload);
      } catch (error) {
        if (error.status === 401 && typeof document !== 'undefined')
          document.dispatchEvent(new Event('studio:session-expired'));
        throw error;
      }
      if (['getEntry', 'entriesByFolder', 'entriesByFiles'].includes(payload.action)) {
        for (const entry of Array.isArray(result) ? result : [result]) {
          if (
            entry?.file?.path &&
            validSha(entry.file.id) &&
            (payload.action === 'getEntry' || !this.fileRevisions.has(entry.file.path))
          )
            this.fileRevisions.set(entry.file.path, entry.file.id);
        }
      }
      if (payload.action === 'persistEntry') {
        for (const [filename, sha] of Object.entries(result.revisions || {}))
          if (validSha(sha)) this.fileRevisions.set(filename, sha);
      }
      return result;
    }

    async getMedia(mediaFolder = this.mediaFolder) {
      const files = await this.request({
        action: 'getMedia',
        params: { branch: this.branch, mediaFolder },
      });
      // Media cards use URLs; getMediaFile still retrieves a real file when Decap needs its bytes.
      return files.map(({ id, name, path, url, size }) => ({
        id,
        name,
        path,
        url,
        displayURL: url,
        ...(Number.isFinite(size) ? { size } : {}),
      }));
    }

    async logout() {
      const response = await fetch('/api/admin/session', {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok && response.status !== 401) throw new Error('退出登录未完成，请重试。');
      window.location.replace('/admin/login');
    }
  };
}

export async function registerOnlineBackend(CMS) {
  const { ProxyBackend } = await import('decap-cms-backend-proxy');
  CMS.registerBackend('soltree-online', createOnlineBackend(ProxyBackend));
}
