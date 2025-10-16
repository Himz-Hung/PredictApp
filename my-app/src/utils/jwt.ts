interface JwtPayload { role?: string }

export const isAdmin = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1])) as JwtPayload;
    console.log(payload);
    
    return payload.role === "admin";
  } catch {
    return false;
  }
};
