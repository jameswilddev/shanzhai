import { ActionStep } from "@shanzhai/interfaces";

/**
 * An {@link ActionStep} which does nothing.
 */
export class NopStep extends ActionStep {
  /**
   * @param name   A description of the operation (not) being performed.
   */
  constructor(name: string) {
    super(name, []);
  }

  /**
   * @inheritdoc
   */
  async execute(): Promise<void> {
    // Intentionally left empty.
  }
}
