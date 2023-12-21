import {CassTypesModel, LevelModel, TerminalModel, WorkersModel, RightsModel, LevelRightsModel} from "../models/migratedata";

async function main() {
    for (let model of [CassTypesModel, LevelModel, TerminalModel, WorkersModel, RightsModel, LevelRightsModel]) {
        await model.sync({alter: true})
    }
    process.exit(0);
}

main().then(r => console.log(r, 'Migration was successful.'));
