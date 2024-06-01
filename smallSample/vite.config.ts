// 安装@types/node包 能在ts项目中使用esmodule的方式引用node模块不报错
import fs from 'fs'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig, CommonServerOptions, PreviewOptions } from 'vite'
import dotenv, { DotenvParseOutput } from 'dotenv'

export default defineConfig(({ mode }) => {
  const envFileName: string = '.env'
  const curEnvFileName = `${envFileName}.${mode}`
  console.log(`curEnvFileName: ${curEnvFileName}`)
  let server: CommonServerOptions = {}
  const preview: PreviewOptions = {}
  const envData = fs.readFileSync(`./${curEnvFileName}`)
  const envMap: DotenvParseOutput = dotenv.parse(envData)
  console.log('envMap:', envMap)

  if (mode === 'development') {
    server = {
      host: envMap.VITE_HOST,
      port: Number(envMap.VITE_PORT),
      proxy: {
        [envMap.VITE_BASE_URL]: {
          target: envMap.VITE_PROXY_DOMAIN
        }
      }
    }
    console.log(`我是${mode}开发环境`, server)
  } else if (mode === 'production') {
    // 生产发布前，使用preview在本地先预览
    // preview = {
    //   // host: envMap.VITE_HOST,
    //   host: '0.0.0.0',
    //   port: Number(envMap.VITE_PORT),
    //   proxy: {
    //     [envMap.VITE_BASE_URL]: {
    //       target: envMap.VITE_PROXY_DOMAIN
    //     }
    //   }
    // }
    server = {
      // 发生产只需要这两项，接口用 nginx 转发
      host: envMap.VITE_HOST,
      port: Number(envMap.VITE_PORT)
    }
    console.log(`我是${mode}生产环境`, server)
  }
  return {
    base: envMap.VITE_ROUTER_BASE_URL || '/',
    plugins: [vue()],
    preview,
    server,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    build: {
      // 关闭资源转base64
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.indexOf('node_modules') !== -1) {
              const path_ = id.toString().split('node_modules/')[1].toString()
              return path_.split('/')[0].toString()
            }
          }
        }
      }
    }
  }
})
