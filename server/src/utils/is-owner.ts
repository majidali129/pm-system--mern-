export const isOwner = (createdBy: string, userId: string) => {
  if (!createdBy || !userId) return false;

  return createdBy === userId;
};
