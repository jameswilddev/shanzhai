import { Trigger } from "../trigger";

/**
 * Describes the export of a Shanzhai {@link Plugin}.
 * @template T Describes the {@link Trigger}s within the {@link Plugin}.
 */
export type Plugin<T extends { readonly [name: string]: Trigger }> = {
  /**
   * The {@link Triggers}s within the {@link Plugin}.
   */
  readonly triggers: T;
};
