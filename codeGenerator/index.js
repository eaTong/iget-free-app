const readline = require('readline');
const path = require('path');
const {updateFile, upperFirstLetter, writeFile} = require("./utils");
const {getImportPage, getAddRoute, getFormPage, getAddForm, getDetailPage, getHomeCardImport, getListItem, getHomeCard, getHomeCardConfig} = require('./templates');

const basePath = path.resolve(process.cwd(), '..', 'src');


const readlineInstance = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

readlineInstance.question('What\'s the form name ?', async form => {
  await updateFile(path.resolve(basePath, 'AppContainer.tsx'), 'importPage', getImportPage(form));
  await updateFile(path.resolve(basePath, 'AppContainer.tsx', 'addPageRoute', getAddRoute(form)));
  await writeFile(path.resolve(basePath, form, `${upperFirstLetter(form)}Page.tsx`, getFormPage(form)));
  await writeFile(path.resolve(basePath, form, `${upperFirstLetter(form)}Detail.tsx`, getDetailPage(form)));
  await writeFile(path.resolve(basePath, form, `${upperFirstLetter(form)}ListItem.tsx`, getListItem(form)));
  await writeFile(path.resolve(basePath, form, `Add${upperFirstLetter(form)}.tsx`, getAddForm(form)));
  await writeFile(path.resolve(basePath, 'components', 'cards'`${upperFirstLetter(form)}Card.tsx`, getHomeCard(form)));
  await updateFile(path.resolve(basePath, 'utils', 'enums.ts'), 'importHomeCard', getHomeCardImport(form));
  await updateFile(path.resolve(basePath, 'utils', 'enums.ts'), 'addHomeCard', getHomeCardConfig(form));


  readlineInstance.close();
  process.exit();
});

