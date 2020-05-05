
const projectConfig = global.zhaCli_projectConfig;
const download = require('download-git-repo');
const ora = require('ora');

module.exports = ()=>{
    const spinner = ora('开始下载文件...').start();
    spinner.color = 'yellow';
    spinner.text = '下载文件中...';
    download('github:zhayes/zha-cli-template', projectConfig.project_path, function (err) {
        if(err){
            pinner.fail('下载失败');
            console.log(err);
        }else{
            spinner.succeed('下载完成');
            console.log(`
                你现在可以进入项目目录下载相关依赖：
                    cd ${projectConfig.project_name} && npm install
            `);

            console.log(`
                下载完成启动项目：
                    npm start
            `);
        }
    })
}