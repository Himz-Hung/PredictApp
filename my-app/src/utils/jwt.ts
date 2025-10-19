interface JwtPayload {
  roles?: string[];
}

export const isAdmin = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1])) as JwtPayload;
    return payload.roles?.includes("ROLE_ADMIN") ?? false;
  } catch {
    return false;
  }
};
