export const isProd = process.env.NODE_ENV === 'production';

export const safeJsonParse = (data: any) => {
  if (data === null || data === undefined) return {};
  try {
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    return {};
  }
};
