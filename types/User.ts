export type UserPermission = "about";

export type UserRole = "member" | "member-premium";

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  permissions: UserPermission[];
};
