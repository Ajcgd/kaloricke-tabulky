import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const softDeletedEntities = [
  "User",
  "UserGoals",
  "UserCredentails",
  "UserDetails",
  "Food",
  "DiaryEntry",
];

async function main() {
  prisma.$use(async (params, next) => {
    if (params.model && softDeletedEntities.includes(params.model)) {
      if (params.action == "delete") {
        params.action = "update";
        params.args["data"] = { deleted: new Date() };
        if (params.model == "User") {
          const userId = params.args.where.id;
          await prisma.session.deleteMany({ where: { userId: userId } });
          await prisma.userCredentials.delete({ where: { userId: userId } });
          await prisma.userDetails.delete({ where: { userId: userId } });
          await prisma.userGoals.delete({ where: { userId: userId } });
          await prisma.diaryEntry.deleteMany({ where: { userId: userId } });
        }
      }

      if (params.action === "findUnique" || params.action === "findFirst") {
        params.action = "findFirst";
        params.args.where["deleted"] = null;
        params.args.rejectOnNotFound = true;
      }
      if (params.action === "findMany") {
        if (params.args) {
          if (params.args.where) {
            if (params.args.where.deleted == undefined) {
              // Exclude deleted records if they have not been explicitly requested
              params.args.where["deleted"] = null;
            }
          } else {
            params.args["where"] = { deleted: null };
          }
        }
      }

      if (params.action == "update") {
        params.action = "updateMany";
        params.args.where["deleted"] = null;
      }
      if (params.action == "updateMany") {
        if (params.args.where != undefined) {
          params.args.where["deleted"] = null;
        } else {
          params.args["where"] = { deleted: null };
        }
      }
    }
    return next(params);
  });
}

main();

export default prisma;
