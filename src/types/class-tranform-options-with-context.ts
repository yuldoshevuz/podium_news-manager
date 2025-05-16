import { ClassTransformOptions } from '@nestjs/common/interfaces/external/class-transform-options.interface';

export interface ClassTransformOptionsWithContext<T = unknown>
  extends ClassTransformOptions {
  context: T;
}
