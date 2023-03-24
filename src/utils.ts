export const formatDate = (val: string) => new Date(val).toISOString().substring(0, 16).replace('T', ' ');
