/** New secret keys use apikey only; legacy service_role JWTs also support Bearer authorization. */
export function supabaseServiceHeaders(key) {
  return {
    apikey: key,
    ...(key.startsWith('sb_secret_') ? {} : { Authorization: `Bearer ${key}` }),
  };
}
