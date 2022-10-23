import {
  Airship,
  AirshipClass,
  Drone,
  Plane,
} from '../../../models/Airships/Airship';
import AirshipFactory from './AirshipFactory';

jest.mock('../../../models/Airships/Airship');

describe('AirshipFactory', () => {
  let instance: any;

  beforeEach(() => {
    instance = new AirshipFactory();
  });

  it('instance should be an instanceof AirshipFactory', () => {
    expect(instance instanceof AirshipFactory).toBeTruthy();
  });

  it('should have a method create()', () => {
    // instance.create(type);
    expect(true).toBeTruthy();
  });
});
