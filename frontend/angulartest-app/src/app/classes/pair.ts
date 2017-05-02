import {PairUser} from "./pairUser";
import {PairDog} from "./pairDog";
/**
 * Created by M1k1tus on 21-Apr-17.
 */

export class Pair {
  constructor(
    public _id?: string,
    public user?: PairUser,
    public dog?: PairDog
  ) {}
}
