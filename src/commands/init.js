
const projectConfig = global.zhaCli_projectConfig;
const download = require('download-git-repo');
const ora = require('ora');

module.exports = ()=>{
    if(!projectConfig.project_path || !projectConfig.project_name) return console.log('未设置项目目录，请设置！');

    const spinner = ora('开始下载文件...').start();
    spinner.color = 'yellow';
    spinner.text = '下载文件中...';

    const projectType = projectConfig.options.projectType;

    const templatePath = `github:zhayes/zha-cli-${projectType==="React" ? 'react' : 'vue'}-template`

    download(templatePath, projectConfig.project_path, function (err) {
        if(err){
            spinner.fail('下载失败');
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