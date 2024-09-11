import { workos } from "@/server/utils/workos";
import { defineAuthEventHandler } from "@/server/utils/authHandler";

type PlansSubscribeBody = {
  id: string;
};

export default defineAuthEventHandler(async (event, { userId }) => {
  const { id } = await readBody<PlansSubscribeBody>(event);

  const { data: memberships } =
    await workos.userManagement.listOrganizationMemberships({
      userId,
      limit: 1,
    });

  const membership = memberships[0];

  await workos.userManagement.updateOrganizationMembership(membership.id, {
    roleSlug: id,
  });
});
