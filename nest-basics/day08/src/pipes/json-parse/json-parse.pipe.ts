import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class JsonParsePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value !== 'string') {
      throw new BadRequestException(`Validation failed: ${metadata.data} must be a string`);
    }

    try {
      return JSON.parse(value);
    } catch (e) {
      throw new BadRequestException(`Validation failed: ${metadata.data} must be a valid JSON string`);
    }
  }
}
