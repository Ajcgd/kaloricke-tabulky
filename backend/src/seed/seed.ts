import { loadData, parseData } from "./yaml-parse/parse";
import seedDb from "./dto-to-database/seed-from-dtos";


const seed = async (path: string) => {
  const data = loadData(path);
  // this comparison seems not needed, but without it TS doesnt know the result is OK afterwards
  if (data.isErr === true) {
    console.log(
      `Could not load the file because of this error: ${data.error.message}`
    );
    return;
  }

  const dataParsed = parseData(data.value)
  if (dataParsed.isErr === true) {
    console.log(
      `Could not parse the data from the file because of this error: ${dataParsed.error.message}`
    );
    return;
  }

  const seedResult = await seedDb(dataParsed.value);
  if (seedResult.isErr === true) {
    console.log(
      `Could not seed the database because of this error: ${seedResult.error.message}`
    );
    return;
  }

  console.log(
    `Success! The database has been seeded successfully! Run 'npx prisma studio' to see the results`
  );
}

seed(process.env["SEED_FILE_PATH"] || "./data/seed.yaml").catch((e) => {
  throw e;
});

