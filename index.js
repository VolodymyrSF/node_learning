const path=require('node:path')
const fs=require('node:fs/promises')
const os=require('node:os')

async function learn(){
    try {
        const basePath=path.join(process.cwd(),'newFolder')
        // await fs.mkdir(basePath,{recursive:true})

        const folderNames=['newFolder1','newFolder2','newFolder3','newFolder4'];
        const filesNames=['file1','file2','file3']
        for (const folderName of folderNames){
            const folderPath=path.join(basePath,folderName)
            await fs.mkdir(folderPath,{recursive:true})
            for (const fileName of filesNames){
                await fs.writeFile(path.join(folderPath,fileName),'Sho tu halava?')

            }
        }

    }catch (e) {
        console.error(e)
    }
}

void learn();