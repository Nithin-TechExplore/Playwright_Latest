const fs=require('fs')
const fs1=require('fs').promises;
const yaml = require('yaml')

class CommonUtils{
    readYamlFiles(filePath)
    {
        const path = fs.readFileSync(filePath,'utf-8')
        return yaml.parse(path);
    }

    async deleteFolder(folderPath){

        try{
            const folderExists = await fs1.access(folderPath)
            .then(() => true)
            .catch(()=> false);

            if(folderExists){

                await fs1.access(folderPath,{recursive:true});
                console.log(`Folder ${folderPath} deleted successfully`)
            }else{
                console.log('Folder ${folderPath} does not exists')
            }
        }
        catch(error){
            console.error('Error deleting folder: ${error}')
        }

    }

}

module.exports = new CommonUtils();