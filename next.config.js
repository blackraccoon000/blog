// const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_SERVER, } = require('next/constants')
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) => {
  /**
   * 開発サーバ向けの設定、環境変数を呼ぶことができる。
   */
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        template_username: 'Template-dev',
        template_password: 'Template-dev',
        template_cluster: 'Template-dev',
        template_database: 'Template-dev',
      },
      reactStrictMode: true,
      poweredByHeader: false,
    }
  }
  /**
   * 本番環境向けの設定
   */
  // if (phase === PHASE_PRODUCTION_SERVER) {
  //   return {
  //     env: {
  //       template_username: 'Template-prod',
  //       template_password: 'Template-prod',
  //       template_cluster: 'Template-prod',
  //       template_database: 'Template-prod',
  //     },
  //     reactStrictMode: true,
  //     poweredByHeader: false,
  //   }
  // }
  return {
    reactStrictMode: true,
    poweredByHeader: false,
  }
}
