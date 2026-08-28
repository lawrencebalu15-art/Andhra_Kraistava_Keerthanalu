export default function middleware(request) {
  const url = new URL(request.url);
  const hostname = url.hostname;

  if (
    hostname === "cms.andhrakraistavakeerthanalukavulu.com" &&
    !url.pathname.startsWith("/admin") &&
    !url.pathname.startsWith("/api")
  ) {
    url.pathname = `/admin${url.pathname}`;

    return Response.rewrite(url);
  }

  return;
}