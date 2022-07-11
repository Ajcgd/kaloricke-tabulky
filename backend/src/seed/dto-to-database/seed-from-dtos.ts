import prisma from "../../client";
import { Result } from "@badrap/result";
import type SeedFileStructure from "../../types/data-transfer-objects";

const seedDB = async (
  yamlParsed: SeedFileStructure
): Promise<Result<boolean>> => {
  try {
    prisma.$transaction([
      ...yamlParsed.role.map((single) => {
        return prisma.role.create({
          data: {
            ...single,
          },
        });
      }),

      ...yamlParsed.user.map((single) => {
        return prisma.user.create({
          data: {
            ...single,
          },
        });
      }),
      ...yamlParsed.userCredentials.map((single) => {
        return prisma.userCredentials.create({
          data: {
            ...single,
          },
        });
      }),
      ...yamlParsed.userGoals.map((single) => {
        return prisma.userGoals.create({
          data: {
            ...single,
          },
        });
      }),
      ...yamlParsed.userDetails.map((single) => {
        return prisma.userDetails.create({
          data: {
            ...single,
          },
        });
      }),

      ...yamlParsed.food.map((single) => {
        return prisma.food.create({
          data: {
            ...single,
          },
        });
      }),
    ]);
    return Result.ok(true);
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default seedDB;
