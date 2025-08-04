export type Permission = {
  module: string;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
};

export type RolePayload = {
  name: string;
  description: string;
  isDefault: boolean;
  permissions: Permission[];
};

export type RoleDto = {
  id: string;
  name: string;
  description: string | null;
  isDefault: boolean;
  isActive: boolean;
  catagory: string | null;
  permissions: Permission[] | Record<string, string[]>;
};