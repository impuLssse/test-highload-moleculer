import type { Context, Service, ServiceSchema } from 'moleculer';

export interface ActionHelloParams {
  name: string;
}

interface GreeterSettings {
  defaultName: string;
}

type GreeterThis = Service<GreeterSettings>;

const GreeterService: ServiceSchema<GreeterSettings> = {
  name: 'greeter',

  /**
   * Dependencies
   */
  dependencies: [],

  /**
   * Actions
   */
  actions: {
    hello: {
      rest: {
        method: 'GET',
        path: '/hello',
      },
      handler(this: GreeterThis /* , ctx: Context */): string {
        return `Hello ${this.settings.defaultName}`;
      },
    },

    welcome: {
      rest: 'GET /welcome/:name',
      params: {
        name: 'string',
      },
      handler(this: GreeterThis, ctx: Context<ActionHelloParams>): string {
        return `Welcome, ${ctx.params.name}`;
      },
    },
  },

  /**
   * Events
   */
  events: {},

  /**
   * Methods
   */
  methods: {},

  /**
   * Service created lifecycle event handler
   */
  created(this: GreeterThis) {},

  /**
   * Service started lifecycle event handler
   */
  async started(this: GreeterThis) {
    this.logger.info('HELLO');
  },

  /**
   * Service stopped lifecycle event handler
   */
  async stopped(this: GreeterThis) {},
};

export default GreeterService;
