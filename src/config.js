export default class Config {

    /**
     * 默认配置
     * @type {{}}
     */
    static defaultConfig = {
        // 开发模式
        dev: false,
    };

    /**
     * 是否开发模式
     * @returns {boolean}
     */
    static isDev() {
        return this.defaultConfig.dev || ['localhost', '127.0.0.1'].includes(`${window.location.hostname}`);
    }

    /**
     * 服务器地址
     * @returns {string}
     */
    static host() {
        if (Config.isDev()) {
            return `http://127.0.0.1:8080`;
        }
        return 'https://eagle.hocgin.top/api/eagle';
    }

    /**
     * 自定义配置
     * @returns {{}}
     */
    static getCustomConfig() {
        return {};
    }

    /**
     * 当前配置
     * @returns {Config.defaultConfig}
     */
    static getConfigs() {
        return {
            ...Config.defaultConfig,
            ...Config.getCustomConfig(),
        };
    }
}
