import { createBrowserHistory, createLocation, createPath } from 'history';
import { parseAdminUrl, adminPathFromCmsPath } from './routes.mjs';

const retainedPath = '__soltreeCmsPath';
const defaultCmsPath = '/collections/products';

/** Keep Decap's shared history object while giving it clean browser URLs. */
export function installAdminNavigation({
  window = globalThis.window,
  history = window?.__SOLTREE_CMS_HISTORY__,
  browserHistory,
} = {}) {
  if (window.__SOLTREE_ADMIN_NAVIGATION__) return window.__SOLTREE_ADMIN_NAVIGATION__;
  if (!history) throw new Error('The prepared content editor history is unavailable.');

  const parse = (href) => parseAdminUrl(new URL(href, window.location.href));
  const originalUrl = new URL(window.location.href);
  let route = parse(originalUrl.href);
  if (!route) throw new Error('Unknown content admin route.');
  window.history.replaceState(window.history.state, '', route.path);
  const browser = browserHistory || createBrowserHistory();
  const logicalPath = (location) => {
    const next = parse(createPath(location));
    const saved = location.state?.[retainedPath];
    return (
      next?.hash?.slice(1) ||
      (typeof saved === 'string' && adminPathFromCmsPath(saved) ? saved : defaultCmsPath)
    );
  };
  const legacyPath = originalUrl.hash.slice(1);
  let cmsPath =
    route.hash?.slice(1) ||
    (legacyPath.startsWith('/collections/') && adminPathFromCmsPath(legacyPath)
      ? legacyPath
      : logicalPath(browser.location));
  const cmsListeners = new Set();
  const listeners = new Set();
  const mappedLocation = (location) => createLocation(cmsPath, location.state, location.key);
  const stateFor = (path, state) => ({ ...state, [retainedPath]: path });
  browser.replace(route.path, stateFor(cmsPath, browser.location.state));
  Object.assign(history, {
    action: browser.action,
    length: browser.length,
    location: mappedLocation(browser.location),
  });

  function move(next, nextCmsPath, action, state) {
    if (next.path === route.path && nextCmsPath === cmsPath) return true;
    browser[action](next.path, stateFor(nextCmsPath, state));
    return route.path === next.path && cmsPath === nextCmsPath;
  }
  function navigate(href) {
    const next = parse(href);
    return next ? move(next, next.hash?.slice(1) || cmsPath, 'push') : false;
  }

  const cmsHref = (path) => {
    const value = typeof path === 'string' ? path : createPath(path);
    const href = value === '/' ? '/admin/products' : adminPathFromCmsPath(value);
    if (!href) throw new Error(`Unsupported content editor route: ${value}`);
    return href;
  };
  const cmsNavigate = (path, action, state) => {
    const next = parse(cmsHref(path));
    // A completed save may redirect the hidden editor while an auxiliary view is open.
    return move(route.hash ? next : route, next.hash.slice(1), action, state ?? path?.state);
  };
  Object.assign(history, {
    createHref: cmsHref,
    push: (path, state) => cmsNavigate(path, 'push', state),
    replace: (path, state) => cmsNavigate(path, 'replace', state),
    go: (steps) => browser.go(steps),
    goBack: () => browser.goBack(),
    goForward: () => browser.goForward(),
    block: (prompt = false) =>
      browser.block((location, action) => {
        if (logicalPath(location) === cmsPath) return undefined;
        return typeof prompt === 'function'
          ? prompt(createLocation(logicalPath(location), location.state, location.key), action)
          : prompt;
      }),
    listen: (listener) => {
      cmsListeners.add(listener);
      return () => cmsListeners.delete(listener);
    },
  });
  browser.listen((location, action) => {
    const nextRoute = parse(createPath(location));
    if (!nextRoute) return;
    const nextCmsPath = logicalPath(location);
    const changed = nextCmsPath !== cmsPath;
    route = nextRoute;
    cmsPath = nextCmsPath;
    history.action = action;
    history.length = browser.length;
    // Auxiliary views hide the mounted editor and retain its unsaved draft.
    if (changed) {
      history.location = mappedLocation(location);
      for (const listener of [...cmsListeners]) listener(history.location, action);
    }
    for (const listener of [...listeners]) listener(route);
  });

  const navigation = {
    navigate,
    listen(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    get route() {
      return route;
    },
    get cmsPath() {
      return cmsPath;
    },
  };
  window.__SOLTREE_ADMIN_NAVIGATION__ = navigation;
  return navigation;
}
