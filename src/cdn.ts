export type CDNFunction = (path: string) => string;

export const getCDNUrl = (path: string, transform?: CDNFunction): string => {
  if (transform) {
    return transform(path);
  }
  return path;
};
