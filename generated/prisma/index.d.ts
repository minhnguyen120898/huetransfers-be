
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model RefreshToken
 * 
 */
export type RefreshToken = $Result.DefaultSelection<Prisma.$RefreshTokenPayload>
/**
 * Model TravelAgency
 * 
 */
export type TravelAgency = $Result.DefaultSelection<Prisma.$TravelAgencyPayload>
/**
 * Model CarBooking
 * 
 */
export type CarBooking = $Result.DefaultSelection<Prisma.$CarBookingPayload>
/**
 * Model PaymentRecord
 * 
 */
export type PaymentRecord = $Result.DefaultSelection<Prisma.$PaymentRecordPayload>
/**
 * Model Expense
 * 
 */
export type Expense = $Result.DefaultSelection<Prisma.$ExpensePayload>
/**
 * Model ActivityLog
 * 
 */
export type ActivityLog = $Result.DefaultSelection<Prisma.$ActivityLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  admin: 'admin',
  user: 'user'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const CarBookingStatus: {
  confirmed: 'confirmed',
  completed: 'completed',
  cancelled: 'cancelled',
  transferred: 'transferred'
};

export type CarBookingStatus = (typeof CarBookingStatus)[keyof typeof CarBookingStatus]


export const PaymentStatus: {
  pending: 'pending',
  partial: 'partial',
  completed: 'completed'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]


export const PaymentCollection: {
  no_collection: 'no_collection',
  collect_from_guest: 'collect_from_guest'
};

export type PaymentCollection = (typeof PaymentCollection)[keyof typeof PaymentCollection]


export const PaymentDirection: {
  received: 'received',
  paid: 'paid'
};

export type PaymentDirection = (typeof PaymentDirection)[keyof typeof PaymentDirection]


export const ExpenseCategory: {
  gasoline: 'gasoline',
  maintenance: 'maintenance',
  insurance: 'insurance',
  bank: 'bank',
  other: 'other'
};

export type ExpenseCategory = (typeof ExpenseCategory)[keyof typeof ExpenseCategory]


export const ActivityAction: {
  create: 'create',
  update: 'update',
  delete: 'delete',
  login: 'login',
  export: 'export'
};

export type ActivityAction = (typeof ActivityAction)[keyof typeof ActivityAction]


export const PartnerType: {
  agency: 'agency',
  guide: 'guide',
  restaurant: 'restaurant',
  transport: 'transport'
};

export type PartnerType = (typeof PartnerType)[keyof typeof PartnerType]


export const TransportType: {
  seats_4: 'seats_4',
  seats_7: 'seats_7',
  seats_16: 'seats_16',
  seats_29: 'seats_29',
  seats_45: 'seats_45'
};

export type TransportType = (typeof TransportType)[keyof typeof TransportType]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type CarBookingStatus = $Enums.CarBookingStatus

export const CarBookingStatus: typeof $Enums.CarBookingStatus

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

export type PaymentCollection = $Enums.PaymentCollection

export const PaymentCollection: typeof $Enums.PaymentCollection

export type PaymentDirection = $Enums.PaymentDirection

export const PaymentDirection: typeof $Enums.PaymentDirection

export type ExpenseCategory = $Enums.ExpenseCategory

export const ExpenseCategory: typeof $Enums.ExpenseCategory

export type ActivityAction = $Enums.ActivityAction

export const ActivityAction: typeof $Enums.ActivityAction

export type PartnerType = $Enums.PartnerType

export const PartnerType: typeof $Enums.PartnerType

export type TransportType = $Enums.TransportType

export const TransportType: typeof $Enums.TransportType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefreshTokens
    * const refreshTokens = await prisma.refreshToken.findMany()
    * ```
    */
  get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.travelAgency`: Exposes CRUD operations for the **TravelAgency** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TravelAgencies
    * const travelAgencies = await prisma.travelAgency.findMany()
    * ```
    */
  get travelAgency(): Prisma.TravelAgencyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.carBooking`: Exposes CRUD operations for the **CarBooking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CarBookings
    * const carBookings = await prisma.carBooking.findMany()
    * ```
    */
  get carBooking(): Prisma.CarBookingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.paymentRecord`: Exposes CRUD operations for the **PaymentRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PaymentRecords
    * const paymentRecords = await prisma.paymentRecord.findMany()
    * ```
    */
  get paymentRecord(): Prisma.PaymentRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.expense`: Exposes CRUD operations for the **Expense** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Expenses
    * const expenses = await prisma.expense.findMany()
    * ```
    */
  get expense(): Prisma.ExpenseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activityLog`: Exposes CRUD operations for the **ActivityLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActivityLogs
    * const activityLogs = await prisma.activityLog.findMany()
    * ```
    */
  get activityLog(): Prisma.ActivityLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    RefreshToken: 'RefreshToken',
    TravelAgency: 'TravelAgency',
    CarBooking: 'CarBooking',
    PaymentRecord: 'PaymentRecord',
    Expense: 'Expense',
    ActivityLog: 'ActivityLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "refreshToken" | "travelAgency" | "carBooking" | "paymentRecord" | "expense" | "activityLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      RefreshToken: {
        payload: Prisma.$RefreshTokenPayload<ExtArgs>
        fields: Prisma.RefreshTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findFirst: {
            args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findMany: {
            args: Prisma.RefreshTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          create: {
            args: Prisma.RefreshTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          createMany: {
            args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          delete: {
            args: Prisma.RefreshTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          update: {
            args: Prisma.RefreshTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          deleteMany: {
            args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RefreshTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          upsert: {
            args: Prisma.RefreshTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          aggregate: {
            args: Prisma.RefreshTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefreshToken>
          }
          groupBy: {
            args: Prisma.RefreshTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefreshTokenCountArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenCountAggregateOutputType> | number
          }
        }
      }
      TravelAgency: {
        payload: Prisma.$TravelAgencyPayload<ExtArgs>
        fields: Prisma.TravelAgencyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TravelAgencyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelAgencyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TravelAgencyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelAgencyPayload>
          }
          findFirst: {
            args: Prisma.TravelAgencyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelAgencyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TravelAgencyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelAgencyPayload>
          }
          findMany: {
            args: Prisma.TravelAgencyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelAgencyPayload>[]
          }
          create: {
            args: Prisma.TravelAgencyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelAgencyPayload>
          }
          createMany: {
            args: Prisma.TravelAgencyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TravelAgencyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelAgencyPayload>[]
          }
          delete: {
            args: Prisma.TravelAgencyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelAgencyPayload>
          }
          update: {
            args: Prisma.TravelAgencyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelAgencyPayload>
          }
          deleteMany: {
            args: Prisma.TravelAgencyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TravelAgencyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TravelAgencyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelAgencyPayload>[]
          }
          upsert: {
            args: Prisma.TravelAgencyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TravelAgencyPayload>
          }
          aggregate: {
            args: Prisma.TravelAgencyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTravelAgency>
          }
          groupBy: {
            args: Prisma.TravelAgencyGroupByArgs<ExtArgs>
            result: $Utils.Optional<TravelAgencyGroupByOutputType>[]
          }
          count: {
            args: Prisma.TravelAgencyCountArgs<ExtArgs>
            result: $Utils.Optional<TravelAgencyCountAggregateOutputType> | number
          }
        }
      }
      CarBooking: {
        payload: Prisma.$CarBookingPayload<ExtArgs>
        fields: Prisma.CarBookingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CarBookingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarBookingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CarBookingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarBookingPayload>
          }
          findFirst: {
            args: Prisma.CarBookingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarBookingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CarBookingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarBookingPayload>
          }
          findMany: {
            args: Prisma.CarBookingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarBookingPayload>[]
          }
          create: {
            args: Prisma.CarBookingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarBookingPayload>
          }
          createMany: {
            args: Prisma.CarBookingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CarBookingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarBookingPayload>[]
          }
          delete: {
            args: Prisma.CarBookingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarBookingPayload>
          }
          update: {
            args: Prisma.CarBookingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarBookingPayload>
          }
          deleteMany: {
            args: Prisma.CarBookingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CarBookingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CarBookingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarBookingPayload>[]
          }
          upsert: {
            args: Prisma.CarBookingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CarBookingPayload>
          }
          aggregate: {
            args: Prisma.CarBookingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCarBooking>
          }
          groupBy: {
            args: Prisma.CarBookingGroupByArgs<ExtArgs>
            result: $Utils.Optional<CarBookingGroupByOutputType>[]
          }
          count: {
            args: Prisma.CarBookingCountArgs<ExtArgs>
            result: $Utils.Optional<CarBookingCountAggregateOutputType> | number
          }
        }
      }
      PaymentRecord: {
        payload: Prisma.$PaymentRecordPayload<ExtArgs>
        fields: Prisma.PaymentRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentRecordPayload>
          }
          findFirst: {
            args: Prisma.PaymentRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentRecordPayload>
          }
          findMany: {
            args: Prisma.PaymentRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentRecordPayload>[]
          }
          create: {
            args: Prisma.PaymentRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentRecordPayload>
          }
          createMany: {
            args: Prisma.PaymentRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentRecordPayload>[]
          }
          delete: {
            args: Prisma.PaymentRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentRecordPayload>
          }
          update: {
            args: Prisma.PaymentRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentRecordPayload>
          }
          deleteMany: {
            args: Prisma.PaymentRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentRecordPayload>[]
          }
          upsert: {
            args: Prisma.PaymentRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentRecordPayload>
          }
          aggregate: {
            args: Prisma.PaymentRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePaymentRecord>
          }
          groupBy: {
            args: Prisma.PaymentRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentRecordCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentRecordCountAggregateOutputType> | number
          }
        }
      }
      Expense: {
        payload: Prisma.$ExpensePayload<ExtArgs>
        fields: Prisma.ExpenseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExpenseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExpenseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          findFirst: {
            args: Prisma.ExpenseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExpenseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          findMany: {
            args: Prisma.ExpenseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>[]
          }
          create: {
            args: Prisma.ExpenseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          createMany: {
            args: Prisma.ExpenseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExpenseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>[]
          }
          delete: {
            args: Prisma.ExpenseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          update: {
            args: Prisma.ExpenseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          deleteMany: {
            args: Prisma.ExpenseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExpenseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExpenseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>[]
          }
          upsert: {
            args: Prisma.ExpenseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          aggregate: {
            args: Prisma.ExpenseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExpense>
          }
          groupBy: {
            args: Prisma.ExpenseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExpenseGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExpenseCountArgs<ExtArgs>
            result: $Utils.Optional<ExpenseCountAggregateOutputType> | number
          }
        }
      }
      ActivityLog: {
        payload: Prisma.$ActivityLogPayload<ExtArgs>
        fields: Prisma.ActivityLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          findFirst: {
            args: Prisma.ActivityLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          findMany: {
            args: Prisma.ActivityLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          create: {
            args: Prisma.ActivityLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          createMany: {
            args: Prisma.ActivityLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivityLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          delete: {
            args: Prisma.ActivityLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          update: {
            args: Prisma.ActivityLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          deleteMany: {
            args: Prisma.ActivityLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActivityLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          upsert: {
            args: Prisma.ActivityLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          aggregate: {
            args: Prisma.ActivityLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivityLog>
          }
          groupBy: {
            args: Prisma.ActivityLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityLogCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    refreshToken?: RefreshTokenOmit
    travelAgency?: TravelAgencyOmit
    carBooking?: CarBookingOmit
    paymentRecord?: PaymentRecordOmit
    expense?: ExpenseOmit
    activityLog?: ActivityLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    refreshTokens: number
    activityLogs: number
    createdTravelAgencies: number
    updatedTravelAgencies: number
    createdCarBookings: number
    updatedCarBookings: number
    createdPaymentRecords: number
    createdExpenses: number
    updatedExpenses: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    refreshTokens?: boolean | UserCountOutputTypeCountRefreshTokensArgs
    activityLogs?: boolean | UserCountOutputTypeCountActivityLogsArgs
    createdTravelAgencies?: boolean | UserCountOutputTypeCountCreatedTravelAgenciesArgs
    updatedTravelAgencies?: boolean | UserCountOutputTypeCountUpdatedTravelAgenciesArgs
    createdCarBookings?: boolean | UserCountOutputTypeCountCreatedCarBookingsArgs
    updatedCarBookings?: boolean | UserCountOutputTypeCountUpdatedCarBookingsArgs
    createdPaymentRecords?: boolean | UserCountOutputTypeCountCreatedPaymentRecordsArgs
    createdExpenses?: boolean | UserCountOutputTypeCountCreatedExpensesArgs
    updatedExpenses?: boolean | UserCountOutputTypeCountUpdatedExpensesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRefreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountActivityLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedTravelAgenciesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TravelAgencyWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUpdatedTravelAgenciesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TravelAgencyWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedCarBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CarBookingWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUpdatedCarBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CarBookingWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedPaymentRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentRecordWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedExpensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUpdatedExpensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseWhereInput
  }


  /**
   * Count Type TravelAgencyCountOutputType
   */

  export type TravelAgencyCountOutputType = {
    carBookings: number
    transferredCarBookings: number
  }

  export type TravelAgencyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    carBookings?: boolean | TravelAgencyCountOutputTypeCountCarBookingsArgs
    transferredCarBookings?: boolean | TravelAgencyCountOutputTypeCountTransferredCarBookingsArgs
  }

  // Custom InputTypes
  /**
   * TravelAgencyCountOutputType without action
   */
  export type TravelAgencyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelAgencyCountOutputType
     */
    select?: TravelAgencyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TravelAgencyCountOutputType without action
   */
  export type TravelAgencyCountOutputTypeCountCarBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CarBookingWhereInput
  }

  /**
   * TravelAgencyCountOutputType without action
   */
  export type TravelAgencyCountOutputTypeCountTransferredCarBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CarBookingWhereInput
  }


  /**
   * Count Type CarBookingCountOutputType
   */

  export type CarBookingCountOutputType = {
    transferBookings: number
  }

  export type CarBookingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transferBookings?: boolean | CarBookingCountOutputTypeCountTransferBookingsArgs
  }

  // Custom InputTypes
  /**
   * CarBookingCountOutputType without action
   */
  export type CarBookingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarBookingCountOutputType
     */
    select?: CarBookingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CarBookingCountOutputType without action
   */
  export type CarBookingCountOutputTypeCountTransferBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CarBookingWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    fullName: string | null
    tel: string | null
    avatarUrl: string | null
    role: $Enums.UserRole | null
    isActive: boolean | null
    emailVerified: boolean | null
    mustChangePassword: boolean | null
    emailVerificationToken: string | null
    passwordResetToken: string | null
    passwordResetExpires: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    lastLogin: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    fullName: string | null
    tel: string | null
    avatarUrl: string | null
    role: $Enums.UserRole | null
    isActive: boolean | null
    emailVerified: boolean | null
    mustChangePassword: boolean | null
    emailVerificationToken: string | null
    passwordResetToken: string | null
    passwordResetExpires: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    lastLogin: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    fullName: number
    tel: number
    avatarUrl: number
    role: number
    isActive: number
    emailVerified: number
    mustChangePassword: number
    emailVerificationToken: number
    passwordResetToken: number
    passwordResetExpires: number
    createdAt: number
    updatedAt: number
    lastLogin: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    fullName?: true
    tel?: true
    avatarUrl?: true
    role?: true
    isActive?: true
    emailVerified?: true
    mustChangePassword?: true
    emailVerificationToken?: true
    passwordResetToken?: true
    passwordResetExpires?: true
    createdAt?: true
    updatedAt?: true
    lastLogin?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    fullName?: true
    tel?: true
    avatarUrl?: true
    role?: true
    isActive?: true
    emailVerified?: true
    mustChangePassword?: true
    emailVerificationToken?: true
    passwordResetToken?: true
    passwordResetExpires?: true
    createdAt?: true
    updatedAt?: true
    lastLogin?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    fullName?: true
    tel?: true
    avatarUrl?: true
    role?: true
    isActive?: true
    emailVerified?: true
    mustChangePassword?: true
    emailVerificationToken?: true
    passwordResetToken?: true
    passwordResetExpires?: true
    createdAt?: true
    updatedAt?: true
    lastLogin?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    fullName: string
    tel: string | null
    avatarUrl: string | null
    role: $Enums.UserRole
    isActive: boolean
    emailVerified: boolean
    mustChangePassword: boolean
    emailVerificationToken: string | null
    passwordResetToken: string | null
    passwordResetExpires: Date | null
    createdAt: Date
    updatedAt: Date
    lastLogin: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    tel?: boolean
    avatarUrl?: boolean
    role?: boolean
    isActive?: boolean
    emailVerified?: boolean
    mustChangePassword?: boolean
    emailVerificationToken?: boolean
    passwordResetToken?: boolean
    passwordResetExpires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLogin?: boolean
    refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs>
    activityLogs?: boolean | User$activityLogsArgs<ExtArgs>
    createdTravelAgencies?: boolean | User$createdTravelAgenciesArgs<ExtArgs>
    updatedTravelAgencies?: boolean | User$updatedTravelAgenciesArgs<ExtArgs>
    createdCarBookings?: boolean | User$createdCarBookingsArgs<ExtArgs>
    updatedCarBookings?: boolean | User$updatedCarBookingsArgs<ExtArgs>
    createdPaymentRecords?: boolean | User$createdPaymentRecordsArgs<ExtArgs>
    createdExpenses?: boolean | User$createdExpensesArgs<ExtArgs>
    updatedExpenses?: boolean | User$updatedExpensesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    tel?: boolean
    avatarUrl?: boolean
    role?: boolean
    isActive?: boolean
    emailVerified?: boolean
    mustChangePassword?: boolean
    emailVerificationToken?: boolean
    passwordResetToken?: boolean
    passwordResetExpires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLogin?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    tel?: boolean
    avatarUrl?: boolean
    role?: boolean
    isActive?: boolean
    emailVerified?: boolean
    mustChangePassword?: boolean
    emailVerificationToken?: boolean
    passwordResetToken?: boolean
    passwordResetExpires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLogin?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    tel?: boolean
    avatarUrl?: boolean
    role?: boolean
    isActive?: boolean
    emailVerified?: boolean
    mustChangePassword?: boolean
    emailVerificationToken?: boolean
    passwordResetToken?: boolean
    passwordResetExpires?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLogin?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordHash" | "fullName" | "tel" | "avatarUrl" | "role" | "isActive" | "emailVerified" | "mustChangePassword" | "emailVerificationToken" | "passwordResetToken" | "passwordResetExpires" | "createdAt" | "updatedAt" | "lastLogin", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs>
    activityLogs?: boolean | User$activityLogsArgs<ExtArgs>
    createdTravelAgencies?: boolean | User$createdTravelAgenciesArgs<ExtArgs>
    updatedTravelAgencies?: boolean | User$updatedTravelAgenciesArgs<ExtArgs>
    createdCarBookings?: boolean | User$createdCarBookingsArgs<ExtArgs>
    updatedCarBookings?: boolean | User$updatedCarBookingsArgs<ExtArgs>
    createdPaymentRecords?: boolean | User$createdPaymentRecordsArgs<ExtArgs>
    createdExpenses?: boolean | User$createdExpensesArgs<ExtArgs>
    updatedExpenses?: boolean | User$updatedExpensesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      refreshTokens: Prisma.$RefreshTokenPayload<ExtArgs>[]
      activityLogs: Prisma.$ActivityLogPayload<ExtArgs>[]
      createdTravelAgencies: Prisma.$TravelAgencyPayload<ExtArgs>[]
      updatedTravelAgencies: Prisma.$TravelAgencyPayload<ExtArgs>[]
      createdCarBookings: Prisma.$CarBookingPayload<ExtArgs>[]
      updatedCarBookings: Prisma.$CarBookingPayload<ExtArgs>[]
      createdPaymentRecords: Prisma.$PaymentRecordPayload<ExtArgs>[]
      createdExpenses: Prisma.$ExpensePayload<ExtArgs>[]
      updatedExpenses: Prisma.$ExpensePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      fullName: string
      tel: string | null
      avatarUrl: string | null
      role: $Enums.UserRole
      isActive: boolean
      emailVerified: boolean
      mustChangePassword: boolean
      emailVerificationToken: string | null
      passwordResetToken: string | null
      passwordResetExpires: Date | null
      createdAt: Date
      updatedAt: Date
      lastLogin: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    refreshTokens<T extends User$refreshTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$refreshTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    activityLogs<T extends User$activityLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$activityLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdTravelAgencies<T extends User$createdTravelAgenciesArgs<ExtArgs> = {}>(args?: Subset<T, User$createdTravelAgenciesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelAgencyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    updatedTravelAgencies<T extends User$updatedTravelAgenciesArgs<ExtArgs> = {}>(args?: Subset<T, User$updatedTravelAgenciesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelAgencyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdCarBookings<T extends User$createdCarBookingsArgs<ExtArgs> = {}>(args?: Subset<T, User$createdCarBookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarBookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    updatedCarBookings<T extends User$updatedCarBookingsArgs<ExtArgs> = {}>(args?: Subset<T, User$updatedCarBookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarBookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdPaymentRecords<T extends User$createdPaymentRecordsArgs<ExtArgs> = {}>(args?: Subset<T, User$createdPaymentRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdExpenses<T extends User$createdExpensesArgs<ExtArgs> = {}>(args?: Subset<T, User$createdExpensesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    updatedExpenses<T extends User$updatedExpensesArgs<ExtArgs> = {}>(args?: Subset<T, User$updatedExpensesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly fullName: FieldRef<"User", 'String'>
    readonly tel: FieldRef<"User", 'String'>
    readonly avatarUrl: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly mustChangePassword: FieldRef<"User", 'Boolean'>
    readonly emailVerificationToken: FieldRef<"User", 'String'>
    readonly passwordResetToken: FieldRef<"User", 'String'>
    readonly passwordResetExpires: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly lastLogin: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.refreshTokens
   */
  export type User$refreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    cursor?: RefreshTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * User.activityLogs
   */
  export type User$activityLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    where?: ActivityLogWhereInput
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    cursor?: ActivityLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * User.createdTravelAgencies
   */
  export type User$createdTravelAgenciesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelAgency
     */
    select?: TravelAgencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelAgency
     */
    omit?: TravelAgencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelAgencyInclude<ExtArgs> | null
    where?: TravelAgencyWhereInput
    orderBy?: TravelAgencyOrderByWithRelationInput | TravelAgencyOrderByWithRelationInput[]
    cursor?: TravelAgencyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TravelAgencyScalarFieldEnum | TravelAgencyScalarFieldEnum[]
  }

  /**
   * User.updatedTravelAgencies
   */
  export type User$updatedTravelAgenciesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelAgency
     */
    select?: TravelAgencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelAgency
     */
    omit?: TravelAgencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelAgencyInclude<ExtArgs> | null
    where?: TravelAgencyWhereInput
    orderBy?: TravelAgencyOrderByWithRelationInput | TravelAgencyOrderByWithRelationInput[]
    cursor?: TravelAgencyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TravelAgencyScalarFieldEnum | TravelAgencyScalarFieldEnum[]
  }

  /**
   * User.createdCarBookings
   */
  export type User$createdCarBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarBooking
     */
    select?: CarBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarBooking
     */
    omit?: CarBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarBookingInclude<ExtArgs> | null
    where?: CarBookingWhereInput
    orderBy?: CarBookingOrderByWithRelationInput | CarBookingOrderByWithRelationInput[]
    cursor?: CarBookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CarBookingScalarFieldEnum | CarBookingScalarFieldEnum[]
  }

  /**
   * User.updatedCarBookings
   */
  export type User$updatedCarBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarBooking
     */
    select?: CarBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarBooking
     */
    omit?: CarBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarBookingInclude<ExtArgs> | null
    where?: CarBookingWhereInput
    orderBy?: CarBookingOrderByWithRelationInput | CarBookingOrderByWithRelationInput[]
    cursor?: CarBookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CarBookingScalarFieldEnum | CarBookingScalarFieldEnum[]
  }

  /**
   * User.createdPaymentRecords
   */
  export type User$createdPaymentRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentRecord
     */
    select?: PaymentRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentRecord
     */
    omit?: PaymentRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentRecordInclude<ExtArgs> | null
    where?: PaymentRecordWhereInput
    orderBy?: PaymentRecordOrderByWithRelationInput | PaymentRecordOrderByWithRelationInput[]
    cursor?: PaymentRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentRecordScalarFieldEnum | PaymentRecordScalarFieldEnum[]
  }

  /**
   * User.createdExpenses
   */
  export type User$createdExpensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    where?: ExpenseWhereInput
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    cursor?: ExpenseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * User.updatedExpenses
   */
  export type User$updatedExpensesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    where?: ExpenseWhereInput
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    cursor?: ExpenseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model RefreshToken
   */

  export type AggregateRefreshToken = {
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  export type RefreshTokenMinAggregateOutputType = {
    id: string | null
    userId: string | null
    jti: string | null
    token: string | null
    deviceInfo: string | null
    ipAddress: string | null
    expiresAt: Date | null
    isRevoked: boolean | null
    revokedAt: Date | null
    revokedBy: string | null
    createdAt: Date | null
    lastUsedAt: Date | null
  }

  export type RefreshTokenMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    jti: string | null
    token: string | null
    deviceInfo: string | null
    ipAddress: string | null
    expiresAt: Date | null
    isRevoked: boolean | null
    revokedAt: Date | null
    revokedBy: string | null
    createdAt: Date | null
    lastUsedAt: Date | null
  }

  export type RefreshTokenCountAggregateOutputType = {
    id: number
    userId: number
    jti: number
    token: number
    deviceInfo: number
    ipAddress: number
    expiresAt: number
    isRevoked: number
    revokedAt: number
    revokedBy: number
    createdAt: number
    lastUsedAt: number
    _all: number
  }


  export type RefreshTokenMinAggregateInputType = {
    id?: true
    userId?: true
    jti?: true
    token?: true
    deviceInfo?: true
    ipAddress?: true
    expiresAt?: true
    isRevoked?: true
    revokedAt?: true
    revokedBy?: true
    createdAt?: true
    lastUsedAt?: true
  }

  export type RefreshTokenMaxAggregateInputType = {
    id?: true
    userId?: true
    jti?: true
    token?: true
    deviceInfo?: true
    ipAddress?: true
    expiresAt?: true
    isRevoked?: true
    revokedAt?: true
    revokedBy?: true
    createdAt?: true
    lastUsedAt?: true
  }

  export type RefreshTokenCountAggregateInputType = {
    id?: true
    userId?: true
    jti?: true
    token?: true
    deviceInfo?: true
    ipAddress?: true
    expiresAt?: true
    isRevoked?: true
    revokedAt?: true
    revokedBy?: true
    createdAt?: true
    lastUsedAt?: true
    _all?: true
  }

  export type RefreshTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshToken to aggregate.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefreshTokens
    **/
    _count?: true | RefreshTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefreshTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type GetRefreshTokenAggregateType<T extends RefreshTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateRefreshToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefreshToken[P]>
      : GetScalarType<T[P], AggregateRefreshToken[P]>
  }




  export type RefreshTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithAggregationInput | RefreshTokenOrderByWithAggregationInput[]
    by: RefreshTokenScalarFieldEnum[] | RefreshTokenScalarFieldEnum
    having?: RefreshTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefreshTokenCountAggregateInputType | true
    _min?: RefreshTokenMinAggregateInputType
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type RefreshTokenGroupByOutputType = {
    id: string
    userId: string
    jti: string
    token: string
    deviceInfo: string | null
    ipAddress: string | null
    expiresAt: Date
    isRevoked: boolean
    revokedAt: Date | null
    revokedBy: string | null
    createdAt: Date
    lastUsedAt: Date | null
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  type GetRefreshTokenGroupByPayload<T extends RefreshTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefreshTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefreshTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
            : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
        }
      >
    >


  export type RefreshTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    jti?: boolean
    token?: boolean
    deviceInfo?: boolean
    ipAddress?: boolean
    expiresAt?: boolean
    isRevoked?: boolean
    revokedAt?: boolean
    revokedBy?: boolean
    createdAt?: boolean
    lastUsedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    jti?: boolean
    token?: boolean
    deviceInfo?: boolean
    ipAddress?: boolean
    expiresAt?: boolean
    isRevoked?: boolean
    revokedAt?: boolean
    revokedBy?: boolean
    createdAt?: boolean
    lastUsedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    jti?: boolean
    token?: boolean
    deviceInfo?: boolean
    ipAddress?: boolean
    expiresAt?: boolean
    isRevoked?: boolean
    revokedAt?: boolean
    revokedBy?: boolean
    createdAt?: boolean
    lastUsedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectScalar = {
    id?: boolean
    userId?: boolean
    jti?: boolean
    token?: boolean
    deviceInfo?: boolean
    ipAddress?: boolean
    expiresAt?: boolean
    isRevoked?: boolean
    revokedAt?: boolean
    revokedBy?: boolean
    createdAt?: boolean
    lastUsedAt?: boolean
  }

  export type RefreshTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "jti" | "token" | "deviceInfo" | "ipAddress" | "expiresAt" | "isRevoked" | "revokedAt" | "revokedBy" | "createdAt" | "lastUsedAt", ExtArgs["result"]["refreshToken"]>
  export type RefreshTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RefreshTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RefreshToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      jti: string
      token: string
      deviceInfo: string | null
      ipAddress: string | null
      expiresAt: Date
      isRevoked: boolean
      revokedAt: Date | null
      revokedBy: string | null
      createdAt: Date
      lastUsedAt: Date | null
    }, ExtArgs["result"]["refreshToken"]>
    composites: {}
  }

  type RefreshTokenGetPayload<S extends boolean | null | undefined | RefreshTokenDefaultArgs> = $Result.GetResult<Prisma.$RefreshTokenPayload, S>

  type RefreshTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RefreshTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RefreshTokenCountAggregateInputType | true
    }

  export interface RefreshTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RefreshToken'], meta: { name: 'RefreshToken' } }
    /**
     * Find zero or one RefreshToken that matches the filter.
     * @param {RefreshTokenFindUniqueArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefreshTokenFindUniqueArgs>(args: SelectSubset<T, RefreshTokenFindUniqueArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RefreshToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RefreshTokenFindUniqueOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefreshTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, RefreshTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefreshTokenFindFirstArgs>(args?: SelectSubset<T, RefreshTokenFindFirstArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefreshTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, RefreshTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany()
     * 
     * // Get first 10 RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefreshTokenFindManyArgs>(args?: SelectSubset<T, RefreshTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RefreshToken.
     * @param {RefreshTokenCreateArgs} args - Arguments to create a RefreshToken.
     * @example
     * // Create one RefreshToken
     * const RefreshToken = await prisma.refreshToken.create({
     *   data: {
     *     // ... data to create a RefreshToken
     *   }
     * })
     * 
     */
    create<T extends RefreshTokenCreateArgs>(args: SelectSubset<T, RefreshTokenCreateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RefreshTokens.
     * @param {RefreshTokenCreateManyArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefreshTokenCreateManyArgs>(args?: SelectSubset<T, RefreshTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RefreshTokens and returns the data saved in the database.
     * @param {RefreshTokenCreateManyAndReturnArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RefreshTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, RefreshTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RefreshToken.
     * @param {RefreshTokenDeleteArgs} args - Arguments to delete one RefreshToken.
     * @example
     * // Delete one RefreshToken
     * const RefreshToken = await prisma.refreshToken.delete({
     *   where: {
     *     // ... filter to delete one RefreshToken
     *   }
     * })
     * 
     */
    delete<T extends RefreshTokenDeleteArgs>(args: SelectSubset<T, RefreshTokenDeleteArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RefreshToken.
     * @param {RefreshTokenUpdateArgs} args - Arguments to update one RefreshToken.
     * @example
     * // Update one RefreshToken
     * const refreshToken = await prisma.refreshToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefreshTokenUpdateArgs>(args: SelectSubset<T, RefreshTokenUpdateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RefreshTokens.
     * @param {RefreshTokenDeleteManyArgs} args - Arguments to filter RefreshTokens to delete.
     * @example
     * // Delete a few RefreshTokens
     * const { count } = await prisma.refreshToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefreshTokenDeleteManyArgs>(args?: SelectSubset<T, RefreshTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefreshTokenUpdateManyArgs>(args: SelectSubset<T, RefreshTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens and returns the data updated in the database.
     * @param {RefreshTokenUpdateManyAndReturnArgs} args - Arguments to update many RefreshTokens.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RefreshTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, RefreshTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RefreshToken.
     * @param {RefreshTokenUpsertArgs} args - Arguments to update or create a RefreshToken.
     * @example
     * // Update or create a RefreshToken
     * const refreshToken = await prisma.refreshToken.upsert({
     *   create: {
     *     // ... data to create a RefreshToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefreshToken we want to update
     *   }
     * })
     */
    upsert<T extends RefreshTokenUpsertArgs>(args: SelectSubset<T, RefreshTokenUpsertArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenCountArgs} args - Arguments to filter RefreshTokens to count.
     * @example
     * // Count the number of RefreshTokens
     * const count = await prisma.refreshToken.count({
     *   where: {
     *     // ... the filter for the RefreshTokens we want to count
     *   }
     * })
    **/
    count<T extends RefreshTokenCountArgs>(
      args?: Subset<T, RefreshTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefreshTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RefreshTokenAggregateArgs>(args: Subset<T, RefreshTokenAggregateArgs>): Prisma.PrismaPromise<GetRefreshTokenAggregateType<T>>

    /**
     * Group by RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RefreshTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefreshTokenGroupByArgs['orderBy'] }
        : { orderBy?: RefreshTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RefreshTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefreshTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RefreshToken model
   */
  readonly fields: RefreshTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefreshToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefreshTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RefreshToken model
   */
  interface RefreshTokenFieldRefs {
    readonly id: FieldRef<"RefreshToken", 'String'>
    readonly userId: FieldRef<"RefreshToken", 'String'>
    readonly jti: FieldRef<"RefreshToken", 'String'>
    readonly token: FieldRef<"RefreshToken", 'String'>
    readonly deviceInfo: FieldRef<"RefreshToken", 'String'>
    readonly ipAddress: FieldRef<"RefreshToken", 'String'>
    readonly expiresAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly isRevoked: FieldRef<"RefreshToken", 'Boolean'>
    readonly revokedAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly revokedBy: FieldRef<"RefreshToken", 'String'>
    readonly createdAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly lastUsedAt: FieldRef<"RefreshToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RefreshToken findUnique
   */
  export type RefreshTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findUniqueOrThrow
   */
  export type RefreshTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findFirst
   */
  export type RefreshTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findFirstOrThrow
   */
  export type RefreshTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findMany
   */
  export type RefreshTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken create
   */
  export type RefreshTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a RefreshToken.
     */
    data: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
  }

  /**
   * RefreshToken createMany
   */
  export type RefreshTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefreshToken createManyAndReturn
   */
  export type RefreshTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken update
   */
  export type RefreshTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a RefreshToken.
     */
    data: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
    /**
     * Choose, which RefreshToken to update.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken updateMany
   */
  export type RefreshTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
  }

  /**
   * RefreshToken updateManyAndReturn
   */
  export type RefreshTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken upsert
   */
  export type RefreshTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the RefreshToken to update in case it exists.
     */
    where: RefreshTokenWhereUniqueInput
    /**
     * In case the RefreshToken found by the `where` argument doesn't exist, create a new RefreshToken with this data.
     */
    create: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
    /**
     * In case the RefreshToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
  }

  /**
   * RefreshToken delete
   */
  export type RefreshTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter which RefreshToken to delete.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken deleteMany
   */
  export type RefreshTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshTokens to delete
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to delete.
     */
    limit?: number
  }

  /**
   * RefreshToken without action
   */
  export type RefreshTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
  }


  /**
   * Model TravelAgency
   */

  export type AggregateTravelAgency = {
    _count: TravelAgencyCountAggregateOutputType | null
    _min: TravelAgencyMinAggregateOutputType | null
    _max: TravelAgencyMaxAggregateOutputType | null
  }

  export type TravelAgencyMinAggregateOutputType = {
    id: string | null
    name: string | null
    tel: string | null
    address: string | null
    note: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    createdById: string | null
    updatedById: string | null
  }

  export type TravelAgencyMaxAggregateOutputType = {
    id: string | null
    name: string | null
    tel: string | null
    address: string | null
    note: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    createdById: string | null
    updatedById: string | null
  }

  export type TravelAgencyCountAggregateOutputType = {
    id: number
    name: number
    tel: number
    address: number
    note: number
    isActive: number
    createdAt: number
    updatedAt: number
    createdById: number
    updatedById: number
    _all: number
  }


  export type TravelAgencyMinAggregateInputType = {
    id?: true
    name?: true
    tel?: true
    address?: true
    note?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
    updatedById?: true
  }

  export type TravelAgencyMaxAggregateInputType = {
    id?: true
    name?: true
    tel?: true
    address?: true
    note?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
    updatedById?: true
  }

  export type TravelAgencyCountAggregateInputType = {
    id?: true
    name?: true
    tel?: true
    address?: true
    note?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
    updatedById?: true
    _all?: true
  }

  export type TravelAgencyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TravelAgency to aggregate.
     */
    where?: TravelAgencyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelAgencies to fetch.
     */
    orderBy?: TravelAgencyOrderByWithRelationInput | TravelAgencyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TravelAgencyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelAgencies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelAgencies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TravelAgencies
    **/
    _count?: true | TravelAgencyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TravelAgencyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TravelAgencyMaxAggregateInputType
  }

  export type GetTravelAgencyAggregateType<T extends TravelAgencyAggregateArgs> = {
        [P in keyof T & keyof AggregateTravelAgency]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTravelAgency[P]>
      : GetScalarType<T[P], AggregateTravelAgency[P]>
  }




  export type TravelAgencyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TravelAgencyWhereInput
    orderBy?: TravelAgencyOrderByWithAggregationInput | TravelAgencyOrderByWithAggregationInput[]
    by: TravelAgencyScalarFieldEnum[] | TravelAgencyScalarFieldEnum
    having?: TravelAgencyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TravelAgencyCountAggregateInputType | true
    _min?: TravelAgencyMinAggregateInputType
    _max?: TravelAgencyMaxAggregateInputType
  }

  export type TravelAgencyGroupByOutputType = {
    id: string
    name: string
    tel: string | null
    address: string | null
    note: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    createdById: string | null
    updatedById: string | null
    _count: TravelAgencyCountAggregateOutputType | null
    _min: TravelAgencyMinAggregateOutputType | null
    _max: TravelAgencyMaxAggregateOutputType | null
  }

  type GetTravelAgencyGroupByPayload<T extends TravelAgencyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TravelAgencyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TravelAgencyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TravelAgencyGroupByOutputType[P]>
            : GetScalarType<T[P], TravelAgencyGroupByOutputType[P]>
        }
      >
    >


  export type TravelAgencySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    tel?: boolean
    address?: boolean
    note?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    updatedById?: boolean
    createdBy?: boolean | TravelAgency$createdByArgs<ExtArgs>
    updatedBy?: boolean | TravelAgency$updatedByArgs<ExtArgs>
    carBookings?: boolean | TravelAgency$carBookingsArgs<ExtArgs>
    transferredCarBookings?: boolean | TravelAgency$transferredCarBookingsArgs<ExtArgs>
    _count?: boolean | TravelAgencyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["travelAgency"]>

  export type TravelAgencySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    tel?: boolean
    address?: boolean
    note?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    updatedById?: boolean
    createdBy?: boolean | TravelAgency$createdByArgs<ExtArgs>
    updatedBy?: boolean | TravelAgency$updatedByArgs<ExtArgs>
  }, ExtArgs["result"]["travelAgency"]>

  export type TravelAgencySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    tel?: boolean
    address?: boolean
    note?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    updatedById?: boolean
    createdBy?: boolean | TravelAgency$createdByArgs<ExtArgs>
    updatedBy?: boolean | TravelAgency$updatedByArgs<ExtArgs>
  }, ExtArgs["result"]["travelAgency"]>

  export type TravelAgencySelectScalar = {
    id?: boolean
    name?: boolean
    tel?: boolean
    address?: boolean
    note?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    updatedById?: boolean
  }

  export type TravelAgencyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "tel" | "address" | "note" | "isActive" | "createdAt" | "updatedAt" | "createdById" | "updatedById", ExtArgs["result"]["travelAgency"]>
  export type TravelAgencyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | TravelAgency$createdByArgs<ExtArgs>
    updatedBy?: boolean | TravelAgency$updatedByArgs<ExtArgs>
    carBookings?: boolean | TravelAgency$carBookingsArgs<ExtArgs>
    transferredCarBookings?: boolean | TravelAgency$transferredCarBookingsArgs<ExtArgs>
    _count?: boolean | TravelAgencyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TravelAgencyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | TravelAgency$createdByArgs<ExtArgs>
    updatedBy?: boolean | TravelAgency$updatedByArgs<ExtArgs>
  }
  export type TravelAgencyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | TravelAgency$createdByArgs<ExtArgs>
    updatedBy?: boolean | TravelAgency$updatedByArgs<ExtArgs>
  }

  export type $TravelAgencyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TravelAgency"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs> | null
      updatedBy: Prisma.$UserPayload<ExtArgs> | null
      carBookings: Prisma.$CarBookingPayload<ExtArgs>[]
      transferredCarBookings: Prisma.$CarBookingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      tel: string | null
      address: string | null
      note: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
      createdById: string | null
      updatedById: string | null
    }, ExtArgs["result"]["travelAgency"]>
    composites: {}
  }

  type TravelAgencyGetPayload<S extends boolean | null | undefined | TravelAgencyDefaultArgs> = $Result.GetResult<Prisma.$TravelAgencyPayload, S>

  type TravelAgencyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TravelAgencyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TravelAgencyCountAggregateInputType | true
    }

  export interface TravelAgencyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TravelAgency'], meta: { name: 'TravelAgency' } }
    /**
     * Find zero or one TravelAgency that matches the filter.
     * @param {TravelAgencyFindUniqueArgs} args - Arguments to find a TravelAgency
     * @example
     * // Get one TravelAgency
     * const travelAgency = await prisma.travelAgency.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TravelAgencyFindUniqueArgs>(args: SelectSubset<T, TravelAgencyFindUniqueArgs<ExtArgs>>): Prisma__TravelAgencyClient<$Result.GetResult<Prisma.$TravelAgencyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TravelAgency that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TravelAgencyFindUniqueOrThrowArgs} args - Arguments to find a TravelAgency
     * @example
     * // Get one TravelAgency
     * const travelAgency = await prisma.travelAgency.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TravelAgencyFindUniqueOrThrowArgs>(args: SelectSubset<T, TravelAgencyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TravelAgencyClient<$Result.GetResult<Prisma.$TravelAgencyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TravelAgency that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelAgencyFindFirstArgs} args - Arguments to find a TravelAgency
     * @example
     * // Get one TravelAgency
     * const travelAgency = await prisma.travelAgency.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TravelAgencyFindFirstArgs>(args?: SelectSubset<T, TravelAgencyFindFirstArgs<ExtArgs>>): Prisma__TravelAgencyClient<$Result.GetResult<Prisma.$TravelAgencyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TravelAgency that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelAgencyFindFirstOrThrowArgs} args - Arguments to find a TravelAgency
     * @example
     * // Get one TravelAgency
     * const travelAgency = await prisma.travelAgency.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TravelAgencyFindFirstOrThrowArgs>(args?: SelectSubset<T, TravelAgencyFindFirstOrThrowArgs<ExtArgs>>): Prisma__TravelAgencyClient<$Result.GetResult<Prisma.$TravelAgencyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TravelAgencies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelAgencyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TravelAgencies
     * const travelAgencies = await prisma.travelAgency.findMany()
     * 
     * // Get first 10 TravelAgencies
     * const travelAgencies = await prisma.travelAgency.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const travelAgencyWithIdOnly = await prisma.travelAgency.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TravelAgencyFindManyArgs>(args?: SelectSubset<T, TravelAgencyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelAgencyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TravelAgency.
     * @param {TravelAgencyCreateArgs} args - Arguments to create a TravelAgency.
     * @example
     * // Create one TravelAgency
     * const TravelAgency = await prisma.travelAgency.create({
     *   data: {
     *     // ... data to create a TravelAgency
     *   }
     * })
     * 
     */
    create<T extends TravelAgencyCreateArgs>(args: SelectSubset<T, TravelAgencyCreateArgs<ExtArgs>>): Prisma__TravelAgencyClient<$Result.GetResult<Prisma.$TravelAgencyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TravelAgencies.
     * @param {TravelAgencyCreateManyArgs} args - Arguments to create many TravelAgencies.
     * @example
     * // Create many TravelAgencies
     * const travelAgency = await prisma.travelAgency.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TravelAgencyCreateManyArgs>(args?: SelectSubset<T, TravelAgencyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TravelAgencies and returns the data saved in the database.
     * @param {TravelAgencyCreateManyAndReturnArgs} args - Arguments to create many TravelAgencies.
     * @example
     * // Create many TravelAgencies
     * const travelAgency = await prisma.travelAgency.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TravelAgencies and only return the `id`
     * const travelAgencyWithIdOnly = await prisma.travelAgency.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TravelAgencyCreateManyAndReturnArgs>(args?: SelectSubset<T, TravelAgencyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelAgencyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TravelAgency.
     * @param {TravelAgencyDeleteArgs} args - Arguments to delete one TravelAgency.
     * @example
     * // Delete one TravelAgency
     * const TravelAgency = await prisma.travelAgency.delete({
     *   where: {
     *     // ... filter to delete one TravelAgency
     *   }
     * })
     * 
     */
    delete<T extends TravelAgencyDeleteArgs>(args: SelectSubset<T, TravelAgencyDeleteArgs<ExtArgs>>): Prisma__TravelAgencyClient<$Result.GetResult<Prisma.$TravelAgencyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TravelAgency.
     * @param {TravelAgencyUpdateArgs} args - Arguments to update one TravelAgency.
     * @example
     * // Update one TravelAgency
     * const travelAgency = await prisma.travelAgency.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TravelAgencyUpdateArgs>(args: SelectSubset<T, TravelAgencyUpdateArgs<ExtArgs>>): Prisma__TravelAgencyClient<$Result.GetResult<Prisma.$TravelAgencyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TravelAgencies.
     * @param {TravelAgencyDeleteManyArgs} args - Arguments to filter TravelAgencies to delete.
     * @example
     * // Delete a few TravelAgencies
     * const { count } = await prisma.travelAgency.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TravelAgencyDeleteManyArgs>(args?: SelectSubset<T, TravelAgencyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TravelAgencies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelAgencyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TravelAgencies
     * const travelAgency = await prisma.travelAgency.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TravelAgencyUpdateManyArgs>(args: SelectSubset<T, TravelAgencyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TravelAgencies and returns the data updated in the database.
     * @param {TravelAgencyUpdateManyAndReturnArgs} args - Arguments to update many TravelAgencies.
     * @example
     * // Update many TravelAgencies
     * const travelAgency = await prisma.travelAgency.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TravelAgencies and only return the `id`
     * const travelAgencyWithIdOnly = await prisma.travelAgency.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TravelAgencyUpdateManyAndReturnArgs>(args: SelectSubset<T, TravelAgencyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TravelAgencyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TravelAgency.
     * @param {TravelAgencyUpsertArgs} args - Arguments to update or create a TravelAgency.
     * @example
     * // Update or create a TravelAgency
     * const travelAgency = await prisma.travelAgency.upsert({
     *   create: {
     *     // ... data to create a TravelAgency
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TravelAgency we want to update
     *   }
     * })
     */
    upsert<T extends TravelAgencyUpsertArgs>(args: SelectSubset<T, TravelAgencyUpsertArgs<ExtArgs>>): Prisma__TravelAgencyClient<$Result.GetResult<Prisma.$TravelAgencyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TravelAgencies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelAgencyCountArgs} args - Arguments to filter TravelAgencies to count.
     * @example
     * // Count the number of TravelAgencies
     * const count = await prisma.travelAgency.count({
     *   where: {
     *     // ... the filter for the TravelAgencies we want to count
     *   }
     * })
    **/
    count<T extends TravelAgencyCountArgs>(
      args?: Subset<T, TravelAgencyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TravelAgencyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TravelAgency.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelAgencyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TravelAgencyAggregateArgs>(args: Subset<T, TravelAgencyAggregateArgs>): Prisma.PrismaPromise<GetTravelAgencyAggregateType<T>>

    /**
     * Group by TravelAgency.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelAgencyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TravelAgencyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TravelAgencyGroupByArgs['orderBy'] }
        : { orderBy?: TravelAgencyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TravelAgencyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTravelAgencyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TravelAgency model
   */
  readonly fields: TravelAgencyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TravelAgency.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TravelAgencyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends TravelAgency$createdByArgs<ExtArgs> = {}>(args?: Subset<T, TravelAgency$createdByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    updatedBy<T extends TravelAgency$updatedByArgs<ExtArgs> = {}>(args?: Subset<T, TravelAgency$updatedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    carBookings<T extends TravelAgency$carBookingsArgs<ExtArgs> = {}>(args?: Subset<T, TravelAgency$carBookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarBookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transferredCarBookings<T extends TravelAgency$transferredCarBookingsArgs<ExtArgs> = {}>(args?: Subset<T, TravelAgency$transferredCarBookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarBookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TravelAgency model
   */
  interface TravelAgencyFieldRefs {
    readonly id: FieldRef<"TravelAgency", 'String'>
    readonly name: FieldRef<"TravelAgency", 'String'>
    readonly tel: FieldRef<"TravelAgency", 'String'>
    readonly address: FieldRef<"TravelAgency", 'String'>
    readonly note: FieldRef<"TravelAgency", 'String'>
    readonly isActive: FieldRef<"TravelAgency", 'Boolean'>
    readonly createdAt: FieldRef<"TravelAgency", 'DateTime'>
    readonly updatedAt: FieldRef<"TravelAgency", 'DateTime'>
    readonly createdById: FieldRef<"TravelAgency", 'String'>
    readonly updatedById: FieldRef<"TravelAgency", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TravelAgency findUnique
   */
  export type TravelAgencyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelAgency
     */
    select?: TravelAgencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelAgency
     */
    omit?: TravelAgencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelAgencyInclude<ExtArgs> | null
    /**
     * Filter, which TravelAgency to fetch.
     */
    where: TravelAgencyWhereUniqueInput
  }

  /**
   * TravelAgency findUniqueOrThrow
   */
  export type TravelAgencyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelAgency
     */
    select?: TravelAgencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelAgency
     */
    omit?: TravelAgencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelAgencyInclude<ExtArgs> | null
    /**
     * Filter, which TravelAgency to fetch.
     */
    where: TravelAgencyWhereUniqueInput
  }

  /**
   * TravelAgency findFirst
   */
  export type TravelAgencyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelAgency
     */
    select?: TravelAgencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelAgency
     */
    omit?: TravelAgencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelAgencyInclude<ExtArgs> | null
    /**
     * Filter, which TravelAgency to fetch.
     */
    where?: TravelAgencyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelAgencies to fetch.
     */
    orderBy?: TravelAgencyOrderByWithRelationInput | TravelAgencyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TravelAgencies.
     */
    cursor?: TravelAgencyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelAgencies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelAgencies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TravelAgencies.
     */
    distinct?: TravelAgencyScalarFieldEnum | TravelAgencyScalarFieldEnum[]
  }

  /**
   * TravelAgency findFirstOrThrow
   */
  export type TravelAgencyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelAgency
     */
    select?: TravelAgencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelAgency
     */
    omit?: TravelAgencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelAgencyInclude<ExtArgs> | null
    /**
     * Filter, which TravelAgency to fetch.
     */
    where?: TravelAgencyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelAgencies to fetch.
     */
    orderBy?: TravelAgencyOrderByWithRelationInput | TravelAgencyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TravelAgencies.
     */
    cursor?: TravelAgencyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelAgencies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelAgencies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TravelAgencies.
     */
    distinct?: TravelAgencyScalarFieldEnum | TravelAgencyScalarFieldEnum[]
  }

  /**
   * TravelAgency findMany
   */
  export type TravelAgencyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelAgency
     */
    select?: TravelAgencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelAgency
     */
    omit?: TravelAgencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelAgencyInclude<ExtArgs> | null
    /**
     * Filter, which TravelAgencies to fetch.
     */
    where?: TravelAgencyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TravelAgencies to fetch.
     */
    orderBy?: TravelAgencyOrderByWithRelationInput | TravelAgencyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TravelAgencies.
     */
    cursor?: TravelAgencyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TravelAgencies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TravelAgencies.
     */
    skip?: number
    distinct?: TravelAgencyScalarFieldEnum | TravelAgencyScalarFieldEnum[]
  }

  /**
   * TravelAgency create
   */
  export type TravelAgencyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelAgency
     */
    select?: TravelAgencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelAgency
     */
    omit?: TravelAgencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelAgencyInclude<ExtArgs> | null
    /**
     * The data needed to create a TravelAgency.
     */
    data: XOR<TravelAgencyCreateInput, TravelAgencyUncheckedCreateInput>
  }

  /**
   * TravelAgency createMany
   */
  export type TravelAgencyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TravelAgencies.
     */
    data: TravelAgencyCreateManyInput | TravelAgencyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TravelAgency createManyAndReturn
   */
  export type TravelAgencyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelAgency
     */
    select?: TravelAgencySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TravelAgency
     */
    omit?: TravelAgencyOmit<ExtArgs> | null
    /**
     * The data used to create many TravelAgencies.
     */
    data: TravelAgencyCreateManyInput | TravelAgencyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelAgencyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TravelAgency update
   */
  export type TravelAgencyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelAgency
     */
    select?: TravelAgencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelAgency
     */
    omit?: TravelAgencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelAgencyInclude<ExtArgs> | null
    /**
     * The data needed to update a TravelAgency.
     */
    data: XOR<TravelAgencyUpdateInput, TravelAgencyUncheckedUpdateInput>
    /**
     * Choose, which TravelAgency to update.
     */
    where: TravelAgencyWhereUniqueInput
  }

  /**
   * TravelAgency updateMany
   */
  export type TravelAgencyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TravelAgencies.
     */
    data: XOR<TravelAgencyUpdateManyMutationInput, TravelAgencyUncheckedUpdateManyInput>
    /**
     * Filter which TravelAgencies to update
     */
    where?: TravelAgencyWhereInput
    /**
     * Limit how many TravelAgencies to update.
     */
    limit?: number
  }

  /**
   * TravelAgency updateManyAndReturn
   */
  export type TravelAgencyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelAgency
     */
    select?: TravelAgencySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TravelAgency
     */
    omit?: TravelAgencyOmit<ExtArgs> | null
    /**
     * The data used to update TravelAgencies.
     */
    data: XOR<TravelAgencyUpdateManyMutationInput, TravelAgencyUncheckedUpdateManyInput>
    /**
     * Filter which TravelAgencies to update
     */
    where?: TravelAgencyWhereInput
    /**
     * Limit how many TravelAgencies to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelAgencyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TravelAgency upsert
   */
  export type TravelAgencyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelAgency
     */
    select?: TravelAgencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelAgency
     */
    omit?: TravelAgencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelAgencyInclude<ExtArgs> | null
    /**
     * The filter to search for the TravelAgency to update in case it exists.
     */
    where: TravelAgencyWhereUniqueInput
    /**
     * In case the TravelAgency found by the `where` argument doesn't exist, create a new TravelAgency with this data.
     */
    create: XOR<TravelAgencyCreateInput, TravelAgencyUncheckedCreateInput>
    /**
     * In case the TravelAgency was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TravelAgencyUpdateInput, TravelAgencyUncheckedUpdateInput>
  }

  /**
   * TravelAgency delete
   */
  export type TravelAgencyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelAgency
     */
    select?: TravelAgencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelAgency
     */
    omit?: TravelAgencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelAgencyInclude<ExtArgs> | null
    /**
     * Filter which TravelAgency to delete.
     */
    where: TravelAgencyWhereUniqueInput
  }

  /**
   * TravelAgency deleteMany
   */
  export type TravelAgencyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TravelAgencies to delete
     */
    where?: TravelAgencyWhereInput
    /**
     * Limit how many TravelAgencies to delete.
     */
    limit?: number
  }

  /**
   * TravelAgency.createdBy
   */
  export type TravelAgency$createdByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * TravelAgency.updatedBy
   */
  export type TravelAgency$updatedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * TravelAgency.carBookings
   */
  export type TravelAgency$carBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarBooking
     */
    select?: CarBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarBooking
     */
    omit?: CarBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarBookingInclude<ExtArgs> | null
    where?: CarBookingWhereInput
    orderBy?: CarBookingOrderByWithRelationInput | CarBookingOrderByWithRelationInput[]
    cursor?: CarBookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CarBookingScalarFieldEnum | CarBookingScalarFieldEnum[]
  }

  /**
   * TravelAgency.transferredCarBookings
   */
  export type TravelAgency$transferredCarBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarBooking
     */
    select?: CarBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarBooking
     */
    omit?: CarBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarBookingInclude<ExtArgs> | null
    where?: CarBookingWhereInput
    orderBy?: CarBookingOrderByWithRelationInput | CarBookingOrderByWithRelationInput[]
    cursor?: CarBookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CarBookingScalarFieldEnum | CarBookingScalarFieldEnum[]
  }

  /**
   * TravelAgency without action
   */
  export type TravelAgencyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelAgency
     */
    select?: TravelAgencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelAgency
     */
    omit?: TravelAgencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelAgencyInclude<ExtArgs> | null
  }


  /**
   * Model CarBooking
   */

  export type AggregateCarBooking = {
    _count: CarBookingCountAggregateOutputType | null
    _avg: CarBookingAvgAggregateOutputType | null
    _sum: CarBookingSumAggregateOutputType | null
    _min: CarBookingMinAggregateOutputType | null
    _max: CarBookingMaxAggregateOutputType | null
  }

  export type CarBookingAvgAggregateOutputType = {
    guestCount: number | null
    sellingPrice: Decimal | null
    receivingPrice: Decimal | null
    debtAmount: Decimal | null
  }

  export type CarBookingSumAggregateOutputType = {
    guestCount: number | null
    sellingPrice: Decimal | null
    receivingPrice: Decimal | null
    debtAmount: Decimal | null
  }

  export type CarBookingMinAggregateOutputType = {
    id: string | null
    bookingCode: string | null
    travelAgencyId: string | null
    vehicleType: $Enums.TransportType | null
    serviceDate: Date | null
    guestName: string | null
    guestPhone: string | null
    guestCount: number | null
    pickupLocation: string | null
    dropoffLocation: string | null
    vat: boolean | null
    sellingPrice: Decimal | null
    receivingPrice: Decimal | null
    debtAmount: Decimal | null
    paymentCollection: $Enums.PaymentCollection | null
    paymentCollectionNote: string | null
    paymentStatus: $Enums.PaymentStatus | null
    paidAt: Date | null
    status: $Enums.CarBookingStatus | null
    note: string | null
    routes: string | null
    isTransfer: boolean | null
    transferFromId: string | null
    transferToAgencyId: string | null
    transferReason: string | null
    transferredAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    createdById: string | null
    updatedById: string | null
  }

  export type CarBookingMaxAggregateOutputType = {
    id: string | null
    bookingCode: string | null
    travelAgencyId: string | null
    vehicleType: $Enums.TransportType | null
    serviceDate: Date | null
    guestName: string | null
    guestPhone: string | null
    guestCount: number | null
    pickupLocation: string | null
    dropoffLocation: string | null
    vat: boolean | null
    sellingPrice: Decimal | null
    receivingPrice: Decimal | null
    debtAmount: Decimal | null
    paymentCollection: $Enums.PaymentCollection | null
    paymentCollectionNote: string | null
    paymentStatus: $Enums.PaymentStatus | null
    paidAt: Date | null
    status: $Enums.CarBookingStatus | null
    note: string | null
    routes: string | null
    isTransfer: boolean | null
    transferFromId: string | null
    transferToAgencyId: string | null
    transferReason: string | null
    transferredAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    createdById: string | null
    updatedById: string | null
  }

  export type CarBookingCountAggregateOutputType = {
    id: number
    bookingCode: number
    travelAgencyId: number
    vehicleType: number
    serviceDate: number
    guestName: number
    guestPhone: number
    guestCount: number
    pickupLocation: number
    dropoffLocation: number
    vat: number
    sellingPrice: number
    receivingPrice: number
    debtAmount: number
    paymentCollection: number
    paymentCollectionNote: number
    paymentStatus: number
    paidAt: number
    status: number
    note: number
    routes: number
    isTransfer: number
    transferFromId: number
    transferToAgencyId: number
    transferReason: number
    transferredAt: number
    createdAt: number
    updatedAt: number
    createdById: number
    updatedById: number
    _all: number
  }


  export type CarBookingAvgAggregateInputType = {
    guestCount?: true
    sellingPrice?: true
    receivingPrice?: true
    debtAmount?: true
  }

  export type CarBookingSumAggregateInputType = {
    guestCount?: true
    sellingPrice?: true
    receivingPrice?: true
    debtAmount?: true
  }

  export type CarBookingMinAggregateInputType = {
    id?: true
    bookingCode?: true
    travelAgencyId?: true
    vehicleType?: true
    serviceDate?: true
    guestName?: true
    guestPhone?: true
    guestCount?: true
    pickupLocation?: true
    dropoffLocation?: true
    vat?: true
    sellingPrice?: true
    receivingPrice?: true
    debtAmount?: true
    paymentCollection?: true
    paymentCollectionNote?: true
    paymentStatus?: true
    paidAt?: true
    status?: true
    note?: true
    routes?: true
    isTransfer?: true
    transferFromId?: true
    transferToAgencyId?: true
    transferReason?: true
    transferredAt?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
    updatedById?: true
  }

  export type CarBookingMaxAggregateInputType = {
    id?: true
    bookingCode?: true
    travelAgencyId?: true
    vehicleType?: true
    serviceDate?: true
    guestName?: true
    guestPhone?: true
    guestCount?: true
    pickupLocation?: true
    dropoffLocation?: true
    vat?: true
    sellingPrice?: true
    receivingPrice?: true
    debtAmount?: true
    paymentCollection?: true
    paymentCollectionNote?: true
    paymentStatus?: true
    paidAt?: true
    status?: true
    note?: true
    routes?: true
    isTransfer?: true
    transferFromId?: true
    transferToAgencyId?: true
    transferReason?: true
    transferredAt?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
    updatedById?: true
  }

  export type CarBookingCountAggregateInputType = {
    id?: true
    bookingCode?: true
    travelAgencyId?: true
    vehicleType?: true
    serviceDate?: true
    guestName?: true
    guestPhone?: true
    guestCount?: true
    pickupLocation?: true
    dropoffLocation?: true
    vat?: true
    sellingPrice?: true
    receivingPrice?: true
    debtAmount?: true
    paymentCollection?: true
    paymentCollectionNote?: true
    paymentStatus?: true
    paidAt?: true
    status?: true
    note?: true
    routes?: true
    isTransfer?: true
    transferFromId?: true
    transferToAgencyId?: true
    transferReason?: true
    transferredAt?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
    updatedById?: true
    _all?: true
  }

  export type CarBookingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CarBooking to aggregate.
     */
    where?: CarBookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CarBookings to fetch.
     */
    orderBy?: CarBookingOrderByWithRelationInput | CarBookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CarBookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CarBookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CarBookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CarBookings
    **/
    _count?: true | CarBookingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CarBookingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CarBookingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CarBookingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CarBookingMaxAggregateInputType
  }

  export type GetCarBookingAggregateType<T extends CarBookingAggregateArgs> = {
        [P in keyof T & keyof AggregateCarBooking]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCarBooking[P]>
      : GetScalarType<T[P], AggregateCarBooking[P]>
  }




  export type CarBookingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CarBookingWhereInput
    orderBy?: CarBookingOrderByWithAggregationInput | CarBookingOrderByWithAggregationInput[]
    by: CarBookingScalarFieldEnum[] | CarBookingScalarFieldEnum
    having?: CarBookingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CarBookingCountAggregateInputType | true
    _avg?: CarBookingAvgAggregateInputType
    _sum?: CarBookingSumAggregateInputType
    _min?: CarBookingMinAggregateInputType
    _max?: CarBookingMaxAggregateInputType
  }

  export type CarBookingGroupByOutputType = {
    id: string
    bookingCode: string
    travelAgencyId: string | null
    vehicleType: $Enums.TransportType
    serviceDate: Date
    guestName: string
    guestPhone: string | null
    guestCount: number
    pickupLocation: string | null
    dropoffLocation: string | null
    vat: boolean
    sellingPrice: Decimal
    receivingPrice: Decimal
    debtAmount: Decimal
    paymentCollection: $Enums.PaymentCollection
    paymentCollectionNote: string | null
    paymentStatus: $Enums.PaymentStatus
    paidAt: Date | null
    status: $Enums.CarBookingStatus
    note: string | null
    routes: string | null
    isTransfer: boolean
    transferFromId: string | null
    transferToAgencyId: string | null
    transferReason: string | null
    transferredAt: Date | null
    createdAt: Date
    updatedAt: Date
    createdById: string | null
    updatedById: string | null
    _count: CarBookingCountAggregateOutputType | null
    _avg: CarBookingAvgAggregateOutputType | null
    _sum: CarBookingSumAggregateOutputType | null
    _min: CarBookingMinAggregateOutputType | null
    _max: CarBookingMaxAggregateOutputType | null
  }

  type GetCarBookingGroupByPayload<T extends CarBookingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CarBookingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CarBookingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CarBookingGroupByOutputType[P]>
            : GetScalarType<T[P], CarBookingGroupByOutputType[P]>
        }
      >
    >


  export type CarBookingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingCode?: boolean
    travelAgencyId?: boolean
    vehicleType?: boolean
    serviceDate?: boolean
    guestName?: boolean
    guestPhone?: boolean
    guestCount?: boolean
    pickupLocation?: boolean
    dropoffLocation?: boolean
    vat?: boolean
    sellingPrice?: boolean
    receivingPrice?: boolean
    debtAmount?: boolean
    paymentCollection?: boolean
    paymentCollectionNote?: boolean
    paymentStatus?: boolean
    paidAt?: boolean
    status?: boolean
    note?: boolean
    routes?: boolean
    isTransfer?: boolean
    transferFromId?: boolean
    transferToAgencyId?: boolean
    transferReason?: boolean
    transferredAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    updatedById?: boolean
    travelAgency?: boolean | CarBooking$travelAgencyArgs<ExtArgs>
    createdBy?: boolean | CarBooking$createdByArgs<ExtArgs>
    updatedBy?: boolean | CarBooking$updatedByArgs<ExtArgs>
    transferFrom?: boolean | CarBooking$transferFromArgs<ExtArgs>
    transferBookings?: boolean | CarBooking$transferBookingsArgs<ExtArgs>
    transferToAgency?: boolean | CarBooking$transferToAgencyArgs<ExtArgs>
    _count?: boolean | CarBookingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["carBooking"]>

  export type CarBookingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingCode?: boolean
    travelAgencyId?: boolean
    vehicleType?: boolean
    serviceDate?: boolean
    guestName?: boolean
    guestPhone?: boolean
    guestCount?: boolean
    pickupLocation?: boolean
    dropoffLocation?: boolean
    vat?: boolean
    sellingPrice?: boolean
    receivingPrice?: boolean
    debtAmount?: boolean
    paymentCollection?: boolean
    paymentCollectionNote?: boolean
    paymentStatus?: boolean
    paidAt?: boolean
    status?: boolean
    note?: boolean
    routes?: boolean
    isTransfer?: boolean
    transferFromId?: boolean
    transferToAgencyId?: boolean
    transferReason?: boolean
    transferredAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    updatedById?: boolean
    travelAgency?: boolean | CarBooking$travelAgencyArgs<ExtArgs>
    createdBy?: boolean | CarBooking$createdByArgs<ExtArgs>
    updatedBy?: boolean | CarBooking$updatedByArgs<ExtArgs>
    transferFrom?: boolean | CarBooking$transferFromArgs<ExtArgs>
    transferToAgency?: boolean | CarBooking$transferToAgencyArgs<ExtArgs>
  }, ExtArgs["result"]["carBooking"]>

  export type CarBookingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingCode?: boolean
    travelAgencyId?: boolean
    vehicleType?: boolean
    serviceDate?: boolean
    guestName?: boolean
    guestPhone?: boolean
    guestCount?: boolean
    pickupLocation?: boolean
    dropoffLocation?: boolean
    vat?: boolean
    sellingPrice?: boolean
    receivingPrice?: boolean
    debtAmount?: boolean
    paymentCollection?: boolean
    paymentCollectionNote?: boolean
    paymentStatus?: boolean
    paidAt?: boolean
    status?: boolean
    note?: boolean
    routes?: boolean
    isTransfer?: boolean
    transferFromId?: boolean
    transferToAgencyId?: boolean
    transferReason?: boolean
    transferredAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    updatedById?: boolean
    travelAgency?: boolean | CarBooking$travelAgencyArgs<ExtArgs>
    createdBy?: boolean | CarBooking$createdByArgs<ExtArgs>
    updatedBy?: boolean | CarBooking$updatedByArgs<ExtArgs>
    transferFrom?: boolean | CarBooking$transferFromArgs<ExtArgs>
    transferToAgency?: boolean | CarBooking$transferToAgencyArgs<ExtArgs>
  }, ExtArgs["result"]["carBooking"]>

  export type CarBookingSelectScalar = {
    id?: boolean
    bookingCode?: boolean
    travelAgencyId?: boolean
    vehicleType?: boolean
    serviceDate?: boolean
    guestName?: boolean
    guestPhone?: boolean
    guestCount?: boolean
    pickupLocation?: boolean
    dropoffLocation?: boolean
    vat?: boolean
    sellingPrice?: boolean
    receivingPrice?: boolean
    debtAmount?: boolean
    paymentCollection?: boolean
    paymentCollectionNote?: boolean
    paymentStatus?: boolean
    paidAt?: boolean
    status?: boolean
    note?: boolean
    routes?: boolean
    isTransfer?: boolean
    transferFromId?: boolean
    transferToAgencyId?: boolean
    transferReason?: boolean
    transferredAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    updatedById?: boolean
  }

  export type CarBookingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "bookingCode" | "travelAgencyId" | "vehicleType" | "serviceDate" | "guestName" | "guestPhone" | "guestCount" | "pickupLocation" | "dropoffLocation" | "vat" | "sellingPrice" | "receivingPrice" | "debtAmount" | "paymentCollection" | "paymentCollectionNote" | "paymentStatus" | "paidAt" | "status" | "note" | "routes" | "isTransfer" | "transferFromId" | "transferToAgencyId" | "transferReason" | "transferredAt" | "createdAt" | "updatedAt" | "createdById" | "updatedById", ExtArgs["result"]["carBooking"]>
  export type CarBookingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    travelAgency?: boolean | CarBooking$travelAgencyArgs<ExtArgs>
    createdBy?: boolean | CarBooking$createdByArgs<ExtArgs>
    updatedBy?: boolean | CarBooking$updatedByArgs<ExtArgs>
    transferFrom?: boolean | CarBooking$transferFromArgs<ExtArgs>
    transferBookings?: boolean | CarBooking$transferBookingsArgs<ExtArgs>
    transferToAgency?: boolean | CarBooking$transferToAgencyArgs<ExtArgs>
    _count?: boolean | CarBookingCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CarBookingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    travelAgency?: boolean | CarBooking$travelAgencyArgs<ExtArgs>
    createdBy?: boolean | CarBooking$createdByArgs<ExtArgs>
    updatedBy?: boolean | CarBooking$updatedByArgs<ExtArgs>
    transferFrom?: boolean | CarBooking$transferFromArgs<ExtArgs>
    transferToAgency?: boolean | CarBooking$transferToAgencyArgs<ExtArgs>
  }
  export type CarBookingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    travelAgency?: boolean | CarBooking$travelAgencyArgs<ExtArgs>
    createdBy?: boolean | CarBooking$createdByArgs<ExtArgs>
    updatedBy?: boolean | CarBooking$updatedByArgs<ExtArgs>
    transferFrom?: boolean | CarBooking$transferFromArgs<ExtArgs>
    transferToAgency?: boolean | CarBooking$transferToAgencyArgs<ExtArgs>
  }

  export type $CarBookingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CarBooking"
    objects: {
      travelAgency: Prisma.$TravelAgencyPayload<ExtArgs> | null
      createdBy: Prisma.$UserPayload<ExtArgs> | null
      updatedBy: Prisma.$UserPayload<ExtArgs> | null
      transferFrom: Prisma.$CarBookingPayload<ExtArgs> | null
      transferBookings: Prisma.$CarBookingPayload<ExtArgs>[]
      transferToAgency: Prisma.$TravelAgencyPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      bookingCode: string
      travelAgencyId: string | null
      vehicleType: $Enums.TransportType
      serviceDate: Date
      guestName: string
      guestPhone: string | null
      guestCount: number
      pickupLocation: string | null
      dropoffLocation: string | null
      vat: boolean
      sellingPrice: Prisma.Decimal
      receivingPrice: Prisma.Decimal
      debtAmount: Prisma.Decimal
      paymentCollection: $Enums.PaymentCollection
      paymentCollectionNote: string | null
      paymentStatus: $Enums.PaymentStatus
      paidAt: Date | null
      status: $Enums.CarBookingStatus
      note: string | null
      routes: string | null
      isTransfer: boolean
      transferFromId: string | null
      transferToAgencyId: string | null
      transferReason: string | null
      transferredAt: Date | null
      createdAt: Date
      updatedAt: Date
      createdById: string | null
      updatedById: string | null
    }, ExtArgs["result"]["carBooking"]>
    composites: {}
  }

  type CarBookingGetPayload<S extends boolean | null | undefined | CarBookingDefaultArgs> = $Result.GetResult<Prisma.$CarBookingPayload, S>

  type CarBookingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CarBookingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CarBookingCountAggregateInputType | true
    }

  export interface CarBookingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CarBooking'], meta: { name: 'CarBooking' } }
    /**
     * Find zero or one CarBooking that matches the filter.
     * @param {CarBookingFindUniqueArgs} args - Arguments to find a CarBooking
     * @example
     * // Get one CarBooking
     * const carBooking = await prisma.carBooking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CarBookingFindUniqueArgs>(args: SelectSubset<T, CarBookingFindUniqueArgs<ExtArgs>>): Prisma__CarBookingClient<$Result.GetResult<Prisma.$CarBookingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CarBooking that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CarBookingFindUniqueOrThrowArgs} args - Arguments to find a CarBooking
     * @example
     * // Get one CarBooking
     * const carBooking = await prisma.carBooking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CarBookingFindUniqueOrThrowArgs>(args: SelectSubset<T, CarBookingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CarBookingClient<$Result.GetResult<Prisma.$CarBookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CarBooking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarBookingFindFirstArgs} args - Arguments to find a CarBooking
     * @example
     * // Get one CarBooking
     * const carBooking = await prisma.carBooking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CarBookingFindFirstArgs>(args?: SelectSubset<T, CarBookingFindFirstArgs<ExtArgs>>): Prisma__CarBookingClient<$Result.GetResult<Prisma.$CarBookingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CarBooking that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarBookingFindFirstOrThrowArgs} args - Arguments to find a CarBooking
     * @example
     * // Get one CarBooking
     * const carBooking = await prisma.carBooking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CarBookingFindFirstOrThrowArgs>(args?: SelectSubset<T, CarBookingFindFirstOrThrowArgs<ExtArgs>>): Prisma__CarBookingClient<$Result.GetResult<Prisma.$CarBookingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CarBookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarBookingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CarBookings
     * const carBookings = await prisma.carBooking.findMany()
     * 
     * // Get first 10 CarBookings
     * const carBookings = await prisma.carBooking.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const carBookingWithIdOnly = await prisma.carBooking.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CarBookingFindManyArgs>(args?: SelectSubset<T, CarBookingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarBookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CarBooking.
     * @param {CarBookingCreateArgs} args - Arguments to create a CarBooking.
     * @example
     * // Create one CarBooking
     * const CarBooking = await prisma.carBooking.create({
     *   data: {
     *     // ... data to create a CarBooking
     *   }
     * })
     * 
     */
    create<T extends CarBookingCreateArgs>(args: SelectSubset<T, CarBookingCreateArgs<ExtArgs>>): Prisma__CarBookingClient<$Result.GetResult<Prisma.$CarBookingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CarBookings.
     * @param {CarBookingCreateManyArgs} args - Arguments to create many CarBookings.
     * @example
     * // Create many CarBookings
     * const carBooking = await prisma.carBooking.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CarBookingCreateManyArgs>(args?: SelectSubset<T, CarBookingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CarBookings and returns the data saved in the database.
     * @param {CarBookingCreateManyAndReturnArgs} args - Arguments to create many CarBookings.
     * @example
     * // Create many CarBookings
     * const carBooking = await prisma.carBooking.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CarBookings and only return the `id`
     * const carBookingWithIdOnly = await prisma.carBooking.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CarBookingCreateManyAndReturnArgs>(args?: SelectSubset<T, CarBookingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarBookingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CarBooking.
     * @param {CarBookingDeleteArgs} args - Arguments to delete one CarBooking.
     * @example
     * // Delete one CarBooking
     * const CarBooking = await prisma.carBooking.delete({
     *   where: {
     *     // ... filter to delete one CarBooking
     *   }
     * })
     * 
     */
    delete<T extends CarBookingDeleteArgs>(args: SelectSubset<T, CarBookingDeleteArgs<ExtArgs>>): Prisma__CarBookingClient<$Result.GetResult<Prisma.$CarBookingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CarBooking.
     * @param {CarBookingUpdateArgs} args - Arguments to update one CarBooking.
     * @example
     * // Update one CarBooking
     * const carBooking = await prisma.carBooking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CarBookingUpdateArgs>(args: SelectSubset<T, CarBookingUpdateArgs<ExtArgs>>): Prisma__CarBookingClient<$Result.GetResult<Prisma.$CarBookingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CarBookings.
     * @param {CarBookingDeleteManyArgs} args - Arguments to filter CarBookings to delete.
     * @example
     * // Delete a few CarBookings
     * const { count } = await prisma.carBooking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CarBookingDeleteManyArgs>(args?: SelectSubset<T, CarBookingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CarBookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarBookingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CarBookings
     * const carBooking = await prisma.carBooking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CarBookingUpdateManyArgs>(args: SelectSubset<T, CarBookingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CarBookings and returns the data updated in the database.
     * @param {CarBookingUpdateManyAndReturnArgs} args - Arguments to update many CarBookings.
     * @example
     * // Update many CarBookings
     * const carBooking = await prisma.carBooking.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CarBookings and only return the `id`
     * const carBookingWithIdOnly = await prisma.carBooking.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CarBookingUpdateManyAndReturnArgs>(args: SelectSubset<T, CarBookingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarBookingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CarBooking.
     * @param {CarBookingUpsertArgs} args - Arguments to update or create a CarBooking.
     * @example
     * // Update or create a CarBooking
     * const carBooking = await prisma.carBooking.upsert({
     *   create: {
     *     // ... data to create a CarBooking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CarBooking we want to update
     *   }
     * })
     */
    upsert<T extends CarBookingUpsertArgs>(args: SelectSubset<T, CarBookingUpsertArgs<ExtArgs>>): Prisma__CarBookingClient<$Result.GetResult<Prisma.$CarBookingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CarBookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarBookingCountArgs} args - Arguments to filter CarBookings to count.
     * @example
     * // Count the number of CarBookings
     * const count = await prisma.carBooking.count({
     *   where: {
     *     // ... the filter for the CarBookings we want to count
     *   }
     * })
    **/
    count<T extends CarBookingCountArgs>(
      args?: Subset<T, CarBookingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CarBookingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CarBooking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarBookingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CarBookingAggregateArgs>(args: Subset<T, CarBookingAggregateArgs>): Prisma.PrismaPromise<GetCarBookingAggregateType<T>>

    /**
     * Group by CarBooking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarBookingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CarBookingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CarBookingGroupByArgs['orderBy'] }
        : { orderBy?: CarBookingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CarBookingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCarBookingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CarBooking model
   */
  readonly fields: CarBookingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CarBooking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CarBookingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    travelAgency<T extends CarBooking$travelAgencyArgs<ExtArgs> = {}>(args?: Subset<T, CarBooking$travelAgencyArgs<ExtArgs>>): Prisma__TravelAgencyClient<$Result.GetResult<Prisma.$TravelAgencyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    createdBy<T extends CarBooking$createdByArgs<ExtArgs> = {}>(args?: Subset<T, CarBooking$createdByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    updatedBy<T extends CarBooking$updatedByArgs<ExtArgs> = {}>(args?: Subset<T, CarBooking$updatedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    transferFrom<T extends CarBooking$transferFromArgs<ExtArgs> = {}>(args?: Subset<T, CarBooking$transferFromArgs<ExtArgs>>): Prisma__CarBookingClient<$Result.GetResult<Prisma.$CarBookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    transferBookings<T extends CarBooking$transferBookingsArgs<ExtArgs> = {}>(args?: Subset<T, CarBooking$transferBookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CarBookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transferToAgency<T extends CarBooking$transferToAgencyArgs<ExtArgs> = {}>(args?: Subset<T, CarBooking$transferToAgencyArgs<ExtArgs>>): Prisma__TravelAgencyClient<$Result.GetResult<Prisma.$TravelAgencyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CarBooking model
   */
  interface CarBookingFieldRefs {
    readonly id: FieldRef<"CarBooking", 'String'>
    readonly bookingCode: FieldRef<"CarBooking", 'String'>
    readonly travelAgencyId: FieldRef<"CarBooking", 'String'>
    readonly vehicleType: FieldRef<"CarBooking", 'TransportType'>
    readonly serviceDate: FieldRef<"CarBooking", 'DateTime'>
    readonly guestName: FieldRef<"CarBooking", 'String'>
    readonly guestPhone: FieldRef<"CarBooking", 'String'>
    readonly guestCount: FieldRef<"CarBooking", 'Int'>
    readonly pickupLocation: FieldRef<"CarBooking", 'String'>
    readonly dropoffLocation: FieldRef<"CarBooking", 'String'>
    readonly vat: FieldRef<"CarBooking", 'Boolean'>
    readonly sellingPrice: FieldRef<"CarBooking", 'Decimal'>
    readonly receivingPrice: FieldRef<"CarBooking", 'Decimal'>
    readonly debtAmount: FieldRef<"CarBooking", 'Decimal'>
    readonly paymentCollection: FieldRef<"CarBooking", 'PaymentCollection'>
    readonly paymentCollectionNote: FieldRef<"CarBooking", 'String'>
    readonly paymentStatus: FieldRef<"CarBooking", 'PaymentStatus'>
    readonly paidAt: FieldRef<"CarBooking", 'DateTime'>
    readonly status: FieldRef<"CarBooking", 'CarBookingStatus'>
    readonly note: FieldRef<"CarBooking", 'String'>
    readonly routes: FieldRef<"CarBooking", 'String'>
    readonly isTransfer: FieldRef<"CarBooking", 'Boolean'>
    readonly transferFromId: FieldRef<"CarBooking", 'String'>
    readonly transferToAgencyId: FieldRef<"CarBooking", 'String'>
    readonly transferReason: FieldRef<"CarBooking", 'String'>
    readonly transferredAt: FieldRef<"CarBooking", 'DateTime'>
    readonly createdAt: FieldRef<"CarBooking", 'DateTime'>
    readonly updatedAt: FieldRef<"CarBooking", 'DateTime'>
    readonly createdById: FieldRef<"CarBooking", 'String'>
    readonly updatedById: FieldRef<"CarBooking", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CarBooking findUnique
   */
  export type CarBookingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarBooking
     */
    select?: CarBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarBooking
     */
    omit?: CarBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarBookingInclude<ExtArgs> | null
    /**
     * Filter, which CarBooking to fetch.
     */
    where: CarBookingWhereUniqueInput
  }

  /**
   * CarBooking findUniqueOrThrow
   */
  export type CarBookingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarBooking
     */
    select?: CarBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarBooking
     */
    omit?: CarBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarBookingInclude<ExtArgs> | null
    /**
     * Filter, which CarBooking to fetch.
     */
    where: CarBookingWhereUniqueInput
  }

  /**
   * CarBooking findFirst
   */
  export type CarBookingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarBooking
     */
    select?: CarBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarBooking
     */
    omit?: CarBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarBookingInclude<ExtArgs> | null
    /**
     * Filter, which CarBooking to fetch.
     */
    where?: CarBookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CarBookings to fetch.
     */
    orderBy?: CarBookingOrderByWithRelationInput | CarBookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CarBookings.
     */
    cursor?: CarBookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CarBookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CarBookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CarBookings.
     */
    distinct?: CarBookingScalarFieldEnum | CarBookingScalarFieldEnum[]
  }

  /**
   * CarBooking findFirstOrThrow
   */
  export type CarBookingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarBooking
     */
    select?: CarBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarBooking
     */
    omit?: CarBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarBookingInclude<ExtArgs> | null
    /**
     * Filter, which CarBooking to fetch.
     */
    where?: CarBookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CarBookings to fetch.
     */
    orderBy?: CarBookingOrderByWithRelationInput | CarBookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CarBookings.
     */
    cursor?: CarBookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CarBookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CarBookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CarBookings.
     */
    distinct?: CarBookingScalarFieldEnum | CarBookingScalarFieldEnum[]
  }

  /**
   * CarBooking findMany
   */
  export type CarBookingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarBooking
     */
    select?: CarBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarBooking
     */
    omit?: CarBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarBookingInclude<ExtArgs> | null
    /**
     * Filter, which CarBookings to fetch.
     */
    where?: CarBookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CarBookings to fetch.
     */
    orderBy?: CarBookingOrderByWithRelationInput | CarBookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CarBookings.
     */
    cursor?: CarBookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CarBookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CarBookings.
     */
    skip?: number
    distinct?: CarBookingScalarFieldEnum | CarBookingScalarFieldEnum[]
  }

  /**
   * CarBooking create
   */
  export type CarBookingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarBooking
     */
    select?: CarBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarBooking
     */
    omit?: CarBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarBookingInclude<ExtArgs> | null
    /**
     * The data needed to create a CarBooking.
     */
    data: XOR<CarBookingCreateInput, CarBookingUncheckedCreateInput>
  }

  /**
   * CarBooking createMany
   */
  export type CarBookingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CarBookings.
     */
    data: CarBookingCreateManyInput | CarBookingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CarBooking createManyAndReturn
   */
  export type CarBookingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarBooking
     */
    select?: CarBookingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CarBooking
     */
    omit?: CarBookingOmit<ExtArgs> | null
    /**
     * The data used to create many CarBookings.
     */
    data: CarBookingCreateManyInput | CarBookingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarBookingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CarBooking update
   */
  export type CarBookingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarBooking
     */
    select?: CarBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarBooking
     */
    omit?: CarBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarBookingInclude<ExtArgs> | null
    /**
     * The data needed to update a CarBooking.
     */
    data: XOR<CarBookingUpdateInput, CarBookingUncheckedUpdateInput>
    /**
     * Choose, which CarBooking to update.
     */
    where: CarBookingWhereUniqueInput
  }

  /**
   * CarBooking updateMany
   */
  export type CarBookingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CarBookings.
     */
    data: XOR<CarBookingUpdateManyMutationInput, CarBookingUncheckedUpdateManyInput>
    /**
     * Filter which CarBookings to update
     */
    where?: CarBookingWhereInput
    /**
     * Limit how many CarBookings to update.
     */
    limit?: number
  }

  /**
   * CarBooking updateManyAndReturn
   */
  export type CarBookingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarBooking
     */
    select?: CarBookingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CarBooking
     */
    omit?: CarBookingOmit<ExtArgs> | null
    /**
     * The data used to update CarBookings.
     */
    data: XOR<CarBookingUpdateManyMutationInput, CarBookingUncheckedUpdateManyInput>
    /**
     * Filter which CarBookings to update
     */
    where?: CarBookingWhereInput
    /**
     * Limit how many CarBookings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarBookingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CarBooking upsert
   */
  export type CarBookingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarBooking
     */
    select?: CarBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarBooking
     */
    omit?: CarBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarBookingInclude<ExtArgs> | null
    /**
     * The filter to search for the CarBooking to update in case it exists.
     */
    where: CarBookingWhereUniqueInput
    /**
     * In case the CarBooking found by the `where` argument doesn't exist, create a new CarBooking with this data.
     */
    create: XOR<CarBookingCreateInput, CarBookingUncheckedCreateInput>
    /**
     * In case the CarBooking was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CarBookingUpdateInput, CarBookingUncheckedUpdateInput>
  }

  /**
   * CarBooking delete
   */
  export type CarBookingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarBooking
     */
    select?: CarBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarBooking
     */
    omit?: CarBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarBookingInclude<ExtArgs> | null
    /**
     * Filter which CarBooking to delete.
     */
    where: CarBookingWhereUniqueInput
  }

  /**
   * CarBooking deleteMany
   */
  export type CarBookingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CarBookings to delete
     */
    where?: CarBookingWhereInput
    /**
     * Limit how many CarBookings to delete.
     */
    limit?: number
  }

  /**
   * CarBooking.travelAgency
   */
  export type CarBooking$travelAgencyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelAgency
     */
    select?: TravelAgencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelAgency
     */
    omit?: TravelAgencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelAgencyInclude<ExtArgs> | null
    where?: TravelAgencyWhereInput
  }

  /**
   * CarBooking.createdBy
   */
  export type CarBooking$createdByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * CarBooking.updatedBy
   */
  export type CarBooking$updatedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * CarBooking.transferFrom
   */
  export type CarBooking$transferFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarBooking
     */
    select?: CarBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarBooking
     */
    omit?: CarBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarBookingInclude<ExtArgs> | null
    where?: CarBookingWhereInput
  }

  /**
   * CarBooking.transferBookings
   */
  export type CarBooking$transferBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarBooking
     */
    select?: CarBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarBooking
     */
    omit?: CarBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarBookingInclude<ExtArgs> | null
    where?: CarBookingWhereInput
    orderBy?: CarBookingOrderByWithRelationInput | CarBookingOrderByWithRelationInput[]
    cursor?: CarBookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CarBookingScalarFieldEnum | CarBookingScalarFieldEnum[]
  }

  /**
   * CarBooking.transferToAgency
   */
  export type CarBooking$transferToAgencyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TravelAgency
     */
    select?: TravelAgencySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TravelAgency
     */
    omit?: TravelAgencyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TravelAgencyInclude<ExtArgs> | null
    where?: TravelAgencyWhereInput
  }

  /**
   * CarBooking without action
   */
  export type CarBookingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarBooking
     */
    select?: CarBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CarBooking
     */
    omit?: CarBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CarBookingInclude<ExtArgs> | null
  }


  /**
   * Model PaymentRecord
   */

  export type AggregatePaymentRecord = {
    _count: PaymentRecordCountAggregateOutputType | null
    _avg: PaymentRecordAvgAggregateOutputType | null
    _sum: PaymentRecordSumAggregateOutputType | null
    _min: PaymentRecordMinAggregateOutputType | null
    _max: PaymentRecordMaxAggregateOutputType | null
  }

  export type PaymentRecordAvgAggregateOutputType = {
    amount: Decimal | null
  }

  export type PaymentRecordSumAggregateOutputType = {
    amount: Decimal | null
  }

  export type PaymentRecordMinAggregateOutputType = {
    id: string | null
    partnerType: $Enums.PartnerType | null
    partnerId: string | null
    debtRecordId: string | null
    paymentDirection: $Enums.PaymentDirection | null
    amount: Decimal | null
    paymentDate: Date | null
    paymentMethod: string | null
    referenceNumber: string | null
    note: string | null
    receiptUrl: string | null
    createdAt: Date | null
    createdById: string | null
  }

  export type PaymentRecordMaxAggregateOutputType = {
    id: string | null
    partnerType: $Enums.PartnerType | null
    partnerId: string | null
    debtRecordId: string | null
    paymentDirection: $Enums.PaymentDirection | null
    amount: Decimal | null
    paymentDate: Date | null
    paymentMethod: string | null
    referenceNumber: string | null
    note: string | null
    receiptUrl: string | null
    createdAt: Date | null
    createdById: string | null
  }

  export type PaymentRecordCountAggregateOutputType = {
    id: number
    partnerType: number
    partnerId: number
    debtRecordId: number
    paymentDirection: number
    amount: number
    paymentDate: number
    paymentMethod: number
    referenceNumber: number
    note: number
    receiptUrl: number
    createdAt: number
    createdById: number
    _all: number
  }


  export type PaymentRecordAvgAggregateInputType = {
    amount?: true
  }

  export type PaymentRecordSumAggregateInputType = {
    amount?: true
  }

  export type PaymentRecordMinAggregateInputType = {
    id?: true
    partnerType?: true
    partnerId?: true
    debtRecordId?: true
    paymentDirection?: true
    amount?: true
    paymentDate?: true
    paymentMethod?: true
    referenceNumber?: true
    note?: true
    receiptUrl?: true
    createdAt?: true
    createdById?: true
  }

  export type PaymentRecordMaxAggregateInputType = {
    id?: true
    partnerType?: true
    partnerId?: true
    debtRecordId?: true
    paymentDirection?: true
    amount?: true
    paymentDate?: true
    paymentMethod?: true
    referenceNumber?: true
    note?: true
    receiptUrl?: true
    createdAt?: true
    createdById?: true
  }

  export type PaymentRecordCountAggregateInputType = {
    id?: true
    partnerType?: true
    partnerId?: true
    debtRecordId?: true
    paymentDirection?: true
    amount?: true
    paymentDate?: true
    paymentMethod?: true
    referenceNumber?: true
    note?: true
    receiptUrl?: true
    createdAt?: true
    createdById?: true
    _all?: true
  }

  export type PaymentRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentRecord to aggregate.
     */
    where?: PaymentRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentRecords to fetch.
     */
    orderBy?: PaymentRecordOrderByWithRelationInput | PaymentRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PaymentRecords
    **/
    _count?: true | PaymentRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentRecordMaxAggregateInputType
  }

  export type GetPaymentRecordAggregateType<T extends PaymentRecordAggregateArgs> = {
        [P in keyof T & keyof AggregatePaymentRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePaymentRecord[P]>
      : GetScalarType<T[P], AggregatePaymentRecord[P]>
  }




  export type PaymentRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentRecordWhereInput
    orderBy?: PaymentRecordOrderByWithAggregationInput | PaymentRecordOrderByWithAggregationInput[]
    by: PaymentRecordScalarFieldEnum[] | PaymentRecordScalarFieldEnum
    having?: PaymentRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentRecordCountAggregateInputType | true
    _avg?: PaymentRecordAvgAggregateInputType
    _sum?: PaymentRecordSumAggregateInputType
    _min?: PaymentRecordMinAggregateInputType
    _max?: PaymentRecordMaxAggregateInputType
  }

  export type PaymentRecordGroupByOutputType = {
    id: string
    partnerType: $Enums.PartnerType
    partnerId: string
    debtRecordId: string | null
    paymentDirection: $Enums.PaymentDirection
    amount: Decimal
    paymentDate: Date
    paymentMethod: string | null
    referenceNumber: string | null
    note: string | null
    receiptUrl: string | null
    createdAt: Date
    createdById: string | null
    _count: PaymentRecordCountAggregateOutputType | null
    _avg: PaymentRecordAvgAggregateOutputType | null
    _sum: PaymentRecordSumAggregateOutputType | null
    _min: PaymentRecordMinAggregateOutputType | null
    _max: PaymentRecordMaxAggregateOutputType | null
  }

  type GetPaymentRecordGroupByPayload<T extends PaymentRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentRecordGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentRecordGroupByOutputType[P]>
        }
      >
    >


  export type PaymentRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    partnerType?: boolean
    partnerId?: boolean
    debtRecordId?: boolean
    paymentDirection?: boolean
    amount?: boolean
    paymentDate?: boolean
    paymentMethod?: boolean
    referenceNumber?: boolean
    note?: boolean
    receiptUrl?: boolean
    createdAt?: boolean
    createdById?: boolean
    createdBy?: boolean | PaymentRecord$createdByArgs<ExtArgs>
  }, ExtArgs["result"]["paymentRecord"]>

  export type PaymentRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    partnerType?: boolean
    partnerId?: boolean
    debtRecordId?: boolean
    paymentDirection?: boolean
    amount?: boolean
    paymentDate?: boolean
    paymentMethod?: boolean
    referenceNumber?: boolean
    note?: boolean
    receiptUrl?: boolean
    createdAt?: boolean
    createdById?: boolean
    createdBy?: boolean | PaymentRecord$createdByArgs<ExtArgs>
  }, ExtArgs["result"]["paymentRecord"]>

  export type PaymentRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    partnerType?: boolean
    partnerId?: boolean
    debtRecordId?: boolean
    paymentDirection?: boolean
    amount?: boolean
    paymentDate?: boolean
    paymentMethod?: boolean
    referenceNumber?: boolean
    note?: boolean
    receiptUrl?: boolean
    createdAt?: boolean
    createdById?: boolean
    createdBy?: boolean | PaymentRecord$createdByArgs<ExtArgs>
  }, ExtArgs["result"]["paymentRecord"]>

  export type PaymentRecordSelectScalar = {
    id?: boolean
    partnerType?: boolean
    partnerId?: boolean
    debtRecordId?: boolean
    paymentDirection?: boolean
    amount?: boolean
    paymentDate?: boolean
    paymentMethod?: boolean
    referenceNumber?: boolean
    note?: boolean
    receiptUrl?: boolean
    createdAt?: boolean
    createdById?: boolean
  }

  export type PaymentRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "partnerType" | "partnerId" | "debtRecordId" | "paymentDirection" | "amount" | "paymentDate" | "paymentMethod" | "referenceNumber" | "note" | "receiptUrl" | "createdAt" | "createdById", ExtArgs["result"]["paymentRecord"]>
  export type PaymentRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | PaymentRecord$createdByArgs<ExtArgs>
  }
  export type PaymentRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | PaymentRecord$createdByArgs<ExtArgs>
  }
  export type PaymentRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | PaymentRecord$createdByArgs<ExtArgs>
  }

  export type $PaymentRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PaymentRecord"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      partnerType: $Enums.PartnerType
      partnerId: string
      debtRecordId: string | null
      paymentDirection: $Enums.PaymentDirection
      amount: Prisma.Decimal
      paymentDate: Date
      paymentMethod: string | null
      referenceNumber: string | null
      note: string | null
      receiptUrl: string | null
      createdAt: Date
      createdById: string | null
    }, ExtArgs["result"]["paymentRecord"]>
    composites: {}
  }

  type PaymentRecordGetPayload<S extends boolean | null | undefined | PaymentRecordDefaultArgs> = $Result.GetResult<Prisma.$PaymentRecordPayload, S>

  type PaymentRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentRecordCountAggregateInputType | true
    }

  export interface PaymentRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PaymentRecord'], meta: { name: 'PaymentRecord' } }
    /**
     * Find zero or one PaymentRecord that matches the filter.
     * @param {PaymentRecordFindUniqueArgs} args - Arguments to find a PaymentRecord
     * @example
     * // Get one PaymentRecord
     * const paymentRecord = await prisma.paymentRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentRecordFindUniqueArgs>(args: SelectSubset<T, PaymentRecordFindUniqueArgs<ExtArgs>>): Prisma__PaymentRecordClient<$Result.GetResult<Prisma.$PaymentRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PaymentRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentRecordFindUniqueOrThrowArgs} args - Arguments to find a PaymentRecord
     * @example
     * // Get one PaymentRecord
     * const paymentRecord = await prisma.paymentRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentRecordClient<$Result.GetResult<Prisma.$PaymentRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PaymentRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentRecordFindFirstArgs} args - Arguments to find a PaymentRecord
     * @example
     * // Get one PaymentRecord
     * const paymentRecord = await prisma.paymentRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentRecordFindFirstArgs>(args?: SelectSubset<T, PaymentRecordFindFirstArgs<ExtArgs>>): Prisma__PaymentRecordClient<$Result.GetResult<Prisma.$PaymentRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PaymentRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentRecordFindFirstOrThrowArgs} args - Arguments to find a PaymentRecord
     * @example
     * // Get one PaymentRecord
     * const paymentRecord = await prisma.paymentRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentRecordClient<$Result.GetResult<Prisma.$PaymentRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PaymentRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PaymentRecords
     * const paymentRecords = await prisma.paymentRecord.findMany()
     * 
     * // Get first 10 PaymentRecords
     * const paymentRecords = await prisma.paymentRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentRecordWithIdOnly = await prisma.paymentRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentRecordFindManyArgs>(args?: SelectSubset<T, PaymentRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PaymentRecord.
     * @param {PaymentRecordCreateArgs} args - Arguments to create a PaymentRecord.
     * @example
     * // Create one PaymentRecord
     * const PaymentRecord = await prisma.paymentRecord.create({
     *   data: {
     *     // ... data to create a PaymentRecord
     *   }
     * })
     * 
     */
    create<T extends PaymentRecordCreateArgs>(args: SelectSubset<T, PaymentRecordCreateArgs<ExtArgs>>): Prisma__PaymentRecordClient<$Result.GetResult<Prisma.$PaymentRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PaymentRecords.
     * @param {PaymentRecordCreateManyArgs} args - Arguments to create many PaymentRecords.
     * @example
     * // Create many PaymentRecords
     * const paymentRecord = await prisma.paymentRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentRecordCreateManyArgs>(args?: SelectSubset<T, PaymentRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PaymentRecords and returns the data saved in the database.
     * @param {PaymentRecordCreateManyAndReturnArgs} args - Arguments to create many PaymentRecords.
     * @example
     * // Create many PaymentRecords
     * const paymentRecord = await prisma.paymentRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PaymentRecords and only return the `id`
     * const paymentRecordWithIdOnly = await prisma.paymentRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PaymentRecord.
     * @param {PaymentRecordDeleteArgs} args - Arguments to delete one PaymentRecord.
     * @example
     * // Delete one PaymentRecord
     * const PaymentRecord = await prisma.paymentRecord.delete({
     *   where: {
     *     // ... filter to delete one PaymentRecord
     *   }
     * })
     * 
     */
    delete<T extends PaymentRecordDeleteArgs>(args: SelectSubset<T, PaymentRecordDeleteArgs<ExtArgs>>): Prisma__PaymentRecordClient<$Result.GetResult<Prisma.$PaymentRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PaymentRecord.
     * @param {PaymentRecordUpdateArgs} args - Arguments to update one PaymentRecord.
     * @example
     * // Update one PaymentRecord
     * const paymentRecord = await prisma.paymentRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentRecordUpdateArgs>(args: SelectSubset<T, PaymentRecordUpdateArgs<ExtArgs>>): Prisma__PaymentRecordClient<$Result.GetResult<Prisma.$PaymentRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PaymentRecords.
     * @param {PaymentRecordDeleteManyArgs} args - Arguments to filter PaymentRecords to delete.
     * @example
     * // Delete a few PaymentRecords
     * const { count } = await prisma.paymentRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentRecordDeleteManyArgs>(args?: SelectSubset<T, PaymentRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PaymentRecords
     * const paymentRecord = await prisma.paymentRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentRecordUpdateManyArgs>(args: SelectSubset<T, PaymentRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentRecords and returns the data updated in the database.
     * @param {PaymentRecordUpdateManyAndReturnArgs} args - Arguments to update many PaymentRecords.
     * @example
     * // Update many PaymentRecords
     * const paymentRecord = await prisma.paymentRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PaymentRecords and only return the `id`
     * const paymentRecordWithIdOnly = await prisma.paymentRecord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PaymentRecord.
     * @param {PaymentRecordUpsertArgs} args - Arguments to update or create a PaymentRecord.
     * @example
     * // Update or create a PaymentRecord
     * const paymentRecord = await prisma.paymentRecord.upsert({
     *   create: {
     *     // ... data to create a PaymentRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PaymentRecord we want to update
     *   }
     * })
     */
    upsert<T extends PaymentRecordUpsertArgs>(args: SelectSubset<T, PaymentRecordUpsertArgs<ExtArgs>>): Prisma__PaymentRecordClient<$Result.GetResult<Prisma.$PaymentRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PaymentRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentRecordCountArgs} args - Arguments to filter PaymentRecords to count.
     * @example
     * // Count the number of PaymentRecords
     * const count = await prisma.paymentRecord.count({
     *   where: {
     *     // ... the filter for the PaymentRecords we want to count
     *   }
     * })
    **/
    count<T extends PaymentRecordCountArgs>(
      args?: Subset<T, PaymentRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PaymentRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentRecordAggregateArgs>(args: Subset<T, PaymentRecordAggregateArgs>): Prisma.PrismaPromise<GetPaymentRecordAggregateType<T>>

    /**
     * Group by PaymentRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentRecordGroupByArgs['orderBy'] }
        : { orderBy?: PaymentRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PaymentRecord model
   */
  readonly fields: PaymentRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PaymentRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends PaymentRecord$createdByArgs<ExtArgs> = {}>(args?: Subset<T, PaymentRecord$createdByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PaymentRecord model
   */
  interface PaymentRecordFieldRefs {
    readonly id: FieldRef<"PaymentRecord", 'String'>
    readonly partnerType: FieldRef<"PaymentRecord", 'PartnerType'>
    readonly partnerId: FieldRef<"PaymentRecord", 'String'>
    readonly debtRecordId: FieldRef<"PaymentRecord", 'String'>
    readonly paymentDirection: FieldRef<"PaymentRecord", 'PaymentDirection'>
    readonly amount: FieldRef<"PaymentRecord", 'Decimal'>
    readonly paymentDate: FieldRef<"PaymentRecord", 'DateTime'>
    readonly paymentMethod: FieldRef<"PaymentRecord", 'String'>
    readonly referenceNumber: FieldRef<"PaymentRecord", 'String'>
    readonly note: FieldRef<"PaymentRecord", 'String'>
    readonly receiptUrl: FieldRef<"PaymentRecord", 'String'>
    readonly createdAt: FieldRef<"PaymentRecord", 'DateTime'>
    readonly createdById: FieldRef<"PaymentRecord", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PaymentRecord findUnique
   */
  export type PaymentRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentRecord
     */
    select?: PaymentRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentRecord
     */
    omit?: PaymentRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentRecordInclude<ExtArgs> | null
    /**
     * Filter, which PaymentRecord to fetch.
     */
    where: PaymentRecordWhereUniqueInput
  }

  /**
   * PaymentRecord findUniqueOrThrow
   */
  export type PaymentRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentRecord
     */
    select?: PaymentRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentRecord
     */
    omit?: PaymentRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentRecordInclude<ExtArgs> | null
    /**
     * Filter, which PaymentRecord to fetch.
     */
    where: PaymentRecordWhereUniqueInput
  }

  /**
   * PaymentRecord findFirst
   */
  export type PaymentRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentRecord
     */
    select?: PaymentRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentRecord
     */
    omit?: PaymentRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentRecordInclude<ExtArgs> | null
    /**
     * Filter, which PaymentRecord to fetch.
     */
    where?: PaymentRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentRecords to fetch.
     */
    orderBy?: PaymentRecordOrderByWithRelationInput | PaymentRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentRecords.
     */
    cursor?: PaymentRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentRecords.
     */
    distinct?: PaymentRecordScalarFieldEnum | PaymentRecordScalarFieldEnum[]
  }

  /**
   * PaymentRecord findFirstOrThrow
   */
  export type PaymentRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentRecord
     */
    select?: PaymentRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentRecord
     */
    omit?: PaymentRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentRecordInclude<ExtArgs> | null
    /**
     * Filter, which PaymentRecord to fetch.
     */
    where?: PaymentRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentRecords to fetch.
     */
    orderBy?: PaymentRecordOrderByWithRelationInput | PaymentRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentRecords.
     */
    cursor?: PaymentRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentRecords.
     */
    distinct?: PaymentRecordScalarFieldEnum | PaymentRecordScalarFieldEnum[]
  }

  /**
   * PaymentRecord findMany
   */
  export type PaymentRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentRecord
     */
    select?: PaymentRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentRecord
     */
    omit?: PaymentRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentRecordInclude<ExtArgs> | null
    /**
     * Filter, which PaymentRecords to fetch.
     */
    where?: PaymentRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentRecords to fetch.
     */
    orderBy?: PaymentRecordOrderByWithRelationInput | PaymentRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PaymentRecords.
     */
    cursor?: PaymentRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentRecords.
     */
    skip?: number
    distinct?: PaymentRecordScalarFieldEnum | PaymentRecordScalarFieldEnum[]
  }

  /**
   * PaymentRecord create
   */
  export type PaymentRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentRecord
     */
    select?: PaymentRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentRecord
     */
    omit?: PaymentRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a PaymentRecord.
     */
    data: XOR<PaymentRecordCreateInput, PaymentRecordUncheckedCreateInput>
  }

  /**
   * PaymentRecord createMany
   */
  export type PaymentRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PaymentRecords.
     */
    data: PaymentRecordCreateManyInput | PaymentRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PaymentRecord createManyAndReturn
   */
  export type PaymentRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentRecord
     */
    select?: PaymentRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentRecord
     */
    omit?: PaymentRecordOmit<ExtArgs> | null
    /**
     * The data used to create many PaymentRecords.
     */
    data: PaymentRecordCreateManyInput | PaymentRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PaymentRecord update
   */
  export type PaymentRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentRecord
     */
    select?: PaymentRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentRecord
     */
    omit?: PaymentRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a PaymentRecord.
     */
    data: XOR<PaymentRecordUpdateInput, PaymentRecordUncheckedUpdateInput>
    /**
     * Choose, which PaymentRecord to update.
     */
    where: PaymentRecordWhereUniqueInput
  }

  /**
   * PaymentRecord updateMany
   */
  export type PaymentRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PaymentRecords.
     */
    data: XOR<PaymentRecordUpdateManyMutationInput, PaymentRecordUncheckedUpdateManyInput>
    /**
     * Filter which PaymentRecords to update
     */
    where?: PaymentRecordWhereInput
    /**
     * Limit how many PaymentRecords to update.
     */
    limit?: number
  }

  /**
   * PaymentRecord updateManyAndReturn
   */
  export type PaymentRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentRecord
     */
    select?: PaymentRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentRecord
     */
    omit?: PaymentRecordOmit<ExtArgs> | null
    /**
     * The data used to update PaymentRecords.
     */
    data: XOR<PaymentRecordUpdateManyMutationInput, PaymentRecordUncheckedUpdateManyInput>
    /**
     * Filter which PaymentRecords to update
     */
    where?: PaymentRecordWhereInput
    /**
     * Limit how many PaymentRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PaymentRecord upsert
   */
  export type PaymentRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentRecord
     */
    select?: PaymentRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentRecord
     */
    omit?: PaymentRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the PaymentRecord to update in case it exists.
     */
    where: PaymentRecordWhereUniqueInput
    /**
     * In case the PaymentRecord found by the `where` argument doesn't exist, create a new PaymentRecord with this data.
     */
    create: XOR<PaymentRecordCreateInput, PaymentRecordUncheckedCreateInput>
    /**
     * In case the PaymentRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentRecordUpdateInput, PaymentRecordUncheckedUpdateInput>
  }

  /**
   * PaymentRecord delete
   */
  export type PaymentRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentRecord
     */
    select?: PaymentRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentRecord
     */
    omit?: PaymentRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentRecordInclude<ExtArgs> | null
    /**
     * Filter which PaymentRecord to delete.
     */
    where: PaymentRecordWhereUniqueInput
  }

  /**
   * PaymentRecord deleteMany
   */
  export type PaymentRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentRecords to delete
     */
    where?: PaymentRecordWhereInput
    /**
     * Limit how many PaymentRecords to delete.
     */
    limit?: number
  }

  /**
   * PaymentRecord.createdBy
   */
  export type PaymentRecord$createdByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * PaymentRecord without action
   */
  export type PaymentRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentRecord
     */
    select?: PaymentRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentRecord
     */
    omit?: PaymentRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentRecordInclude<ExtArgs> | null
  }


  /**
   * Model Expense
   */

  export type AggregateExpense = {
    _count: ExpenseCountAggregateOutputType | null
    _avg: ExpenseAvgAggregateOutputType | null
    _sum: ExpenseSumAggregateOutputType | null
    _min: ExpenseMinAggregateOutputType | null
    _max: ExpenseMaxAggregateOutputType | null
  }

  export type ExpenseAvgAggregateOutputType = {
    amount: Decimal | null
    month: number | null
    year: number | null
  }

  export type ExpenseSumAggregateOutputType = {
    amount: Decimal | null
    month: number | null
    year: number | null
  }

  export type ExpenseMinAggregateOutputType = {
    id: string | null
    title: string | null
    amount: Decimal | null
    category: $Enums.ExpenseCategory | null
    month: number | null
    year: number | null
    note: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    createdById: string | null
    updatedById: string | null
  }

  export type ExpenseMaxAggregateOutputType = {
    id: string | null
    title: string | null
    amount: Decimal | null
    category: $Enums.ExpenseCategory | null
    month: number | null
    year: number | null
    note: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    createdById: string | null
    updatedById: string | null
  }

  export type ExpenseCountAggregateOutputType = {
    id: number
    title: number
    amount: number
    category: number
    month: number
    year: number
    note: number
    isActive: number
    createdAt: number
    updatedAt: number
    createdById: number
    updatedById: number
    _all: number
  }


  export type ExpenseAvgAggregateInputType = {
    amount?: true
    month?: true
    year?: true
  }

  export type ExpenseSumAggregateInputType = {
    amount?: true
    month?: true
    year?: true
  }

  export type ExpenseMinAggregateInputType = {
    id?: true
    title?: true
    amount?: true
    category?: true
    month?: true
    year?: true
    note?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
    updatedById?: true
  }

  export type ExpenseMaxAggregateInputType = {
    id?: true
    title?: true
    amount?: true
    category?: true
    month?: true
    year?: true
    note?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
    updatedById?: true
  }

  export type ExpenseCountAggregateInputType = {
    id?: true
    title?: true
    amount?: true
    category?: true
    month?: true
    year?: true
    note?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    createdById?: true
    updatedById?: true
    _all?: true
  }

  export type ExpenseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Expense to aggregate.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Expenses
    **/
    _count?: true | ExpenseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExpenseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExpenseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExpenseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExpenseMaxAggregateInputType
  }

  export type GetExpenseAggregateType<T extends ExpenseAggregateArgs> = {
        [P in keyof T & keyof AggregateExpense]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExpense[P]>
      : GetScalarType<T[P], AggregateExpense[P]>
  }




  export type ExpenseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseWhereInput
    orderBy?: ExpenseOrderByWithAggregationInput | ExpenseOrderByWithAggregationInput[]
    by: ExpenseScalarFieldEnum[] | ExpenseScalarFieldEnum
    having?: ExpenseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExpenseCountAggregateInputType | true
    _avg?: ExpenseAvgAggregateInputType
    _sum?: ExpenseSumAggregateInputType
    _min?: ExpenseMinAggregateInputType
    _max?: ExpenseMaxAggregateInputType
  }

  export type ExpenseGroupByOutputType = {
    id: string
    title: string
    amount: Decimal
    category: $Enums.ExpenseCategory
    month: number
    year: number
    note: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    createdById: string | null
    updatedById: string | null
    _count: ExpenseCountAggregateOutputType | null
    _avg: ExpenseAvgAggregateOutputType | null
    _sum: ExpenseSumAggregateOutputType | null
    _min: ExpenseMinAggregateOutputType | null
    _max: ExpenseMaxAggregateOutputType | null
  }

  type GetExpenseGroupByPayload<T extends ExpenseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExpenseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExpenseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExpenseGroupByOutputType[P]>
            : GetScalarType<T[P], ExpenseGroupByOutputType[P]>
        }
      >
    >


  export type ExpenseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    amount?: boolean
    category?: boolean
    month?: boolean
    year?: boolean
    note?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    updatedById?: boolean
    createdBy?: boolean | Expense$createdByArgs<ExtArgs>
    updatedBy?: boolean | Expense$updatedByArgs<ExtArgs>
  }, ExtArgs["result"]["expense"]>

  export type ExpenseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    amount?: boolean
    category?: boolean
    month?: boolean
    year?: boolean
    note?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    updatedById?: boolean
    createdBy?: boolean | Expense$createdByArgs<ExtArgs>
    updatedBy?: boolean | Expense$updatedByArgs<ExtArgs>
  }, ExtArgs["result"]["expense"]>

  export type ExpenseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    amount?: boolean
    category?: boolean
    month?: boolean
    year?: boolean
    note?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    updatedById?: boolean
    createdBy?: boolean | Expense$createdByArgs<ExtArgs>
    updatedBy?: boolean | Expense$updatedByArgs<ExtArgs>
  }, ExtArgs["result"]["expense"]>

  export type ExpenseSelectScalar = {
    id?: boolean
    title?: boolean
    amount?: boolean
    category?: boolean
    month?: boolean
    year?: boolean
    note?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdById?: boolean
    updatedById?: boolean
  }

  export type ExpenseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "amount" | "category" | "month" | "year" | "note" | "isActive" | "createdAt" | "updatedAt" | "createdById" | "updatedById", ExtArgs["result"]["expense"]>
  export type ExpenseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | Expense$createdByArgs<ExtArgs>
    updatedBy?: boolean | Expense$updatedByArgs<ExtArgs>
  }
  export type ExpenseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | Expense$createdByArgs<ExtArgs>
    updatedBy?: boolean | Expense$updatedByArgs<ExtArgs>
  }
  export type ExpenseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | Expense$createdByArgs<ExtArgs>
    updatedBy?: boolean | Expense$updatedByArgs<ExtArgs>
  }

  export type $ExpensePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Expense"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs> | null
      updatedBy: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      amount: Prisma.Decimal
      category: $Enums.ExpenseCategory
      month: number
      year: number
      note: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
      createdById: string | null
      updatedById: string | null
    }, ExtArgs["result"]["expense"]>
    composites: {}
  }

  type ExpenseGetPayload<S extends boolean | null | undefined | ExpenseDefaultArgs> = $Result.GetResult<Prisma.$ExpensePayload, S>

  type ExpenseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExpenseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExpenseCountAggregateInputType | true
    }

  export interface ExpenseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Expense'], meta: { name: 'Expense' } }
    /**
     * Find zero or one Expense that matches the filter.
     * @param {ExpenseFindUniqueArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExpenseFindUniqueArgs>(args: SelectSubset<T, ExpenseFindUniqueArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Expense that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExpenseFindUniqueOrThrowArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExpenseFindUniqueOrThrowArgs>(args: SelectSubset<T, ExpenseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Expense that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseFindFirstArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExpenseFindFirstArgs>(args?: SelectSubset<T, ExpenseFindFirstArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Expense that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseFindFirstOrThrowArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExpenseFindFirstOrThrowArgs>(args?: SelectSubset<T, ExpenseFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Expenses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Expenses
     * const expenses = await prisma.expense.findMany()
     * 
     * // Get first 10 Expenses
     * const expenses = await prisma.expense.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const expenseWithIdOnly = await prisma.expense.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExpenseFindManyArgs>(args?: SelectSubset<T, ExpenseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Expense.
     * @param {ExpenseCreateArgs} args - Arguments to create a Expense.
     * @example
     * // Create one Expense
     * const Expense = await prisma.expense.create({
     *   data: {
     *     // ... data to create a Expense
     *   }
     * })
     * 
     */
    create<T extends ExpenseCreateArgs>(args: SelectSubset<T, ExpenseCreateArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Expenses.
     * @param {ExpenseCreateManyArgs} args - Arguments to create many Expenses.
     * @example
     * // Create many Expenses
     * const expense = await prisma.expense.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExpenseCreateManyArgs>(args?: SelectSubset<T, ExpenseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Expenses and returns the data saved in the database.
     * @param {ExpenseCreateManyAndReturnArgs} args - Arguments to create many Expenses.
     * @example
     * // Create many Expenses
     * const expense = await prisma.expense.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Expenses and only return the `id`
     * const expenseWithIdOnly = await prisma.expense.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExpenseCreateManyAndReturnArgs>(args?: SelectSubset<T, ExpenseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Expense.
     * @param {ExpenseDeleteArgs} args - Arguments to delete one Expense.
     * @example
     * // Delete one Expense
     * const Expense = await prisma.expense.delete({
     *   where: {
     *     // ... filter to delete one Expense
     *   }
     * })
     * 
     */
    delete<T extends ExpenseDeleteArgs>(args: SelectSubset<T, ExpenseDeleteArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Expense.
     * @param {ExpenseUpdateArgs} args - Arguments to update one Expense.
     * @example
     * // Update one Expense
     * const expense = await prisma.expense.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExpenseUpdateArgs>(args: SelectSubset<T, ExpenseUpdateArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Expenses.
     * @param {ExpenseDeleteManyArgs} args - Arguments to filter Expenses to delete.
     * @example
     * // Delete a few Expenses
     * const { count } = await prisma.expense.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExpenseDeleteManyArgs>(args?: SelectSubset<T, ExpenseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Expenses
     * const expense = await prisma.expense.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExpenseUpdateManyArgs>(args: SelectSubset<T, ExpenseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Expenses and returns the data updated in the database.
     * @param {ExpenseUpdateManyAndReturnArgs} args - Arguments to update many Expenses.
     * @example
     * // Update many Expenses
     * const expense = await prisma.expense.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Expenses and only return the `id`
     * const expenseWithIdOnly = await prisma.expense.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExpenseUpdateManyAndReturnArgs>(args: SelectSubset<T, ExpenseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Expense.
     * @param {ExpenseUpsertArgs} args - Arguments to update or create a Expense.
     * @example
     * // Update or create a Expense
     * const expense = await prisma.expense.upsert({
     *   create: {
     *     // ... data to create a Expense
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Expense we want to update
     *   }
     * })
     */
    upsert<T extends ExpenseUpsertArgs>(args: SelectSubset<T, ExpenseUpsertArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCountArgs} args - Arguments to filter Expenses to count.
     * @example
     * // Count the number of Expenses
     * const count = await prisma.expense.count({
     *   where: {
     *     // ... the filter for the Expenses we want to count
     *   }
     * })
    **/
    count<T extends ExpenseCountArgs>(
      args?: Subset<T, ExpenseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExpenseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Expense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExpenseAggregateArgs>(args: Subset<T, ExpenseAggregateArgs>): Prisma.PrismaPromise<GetExpenseAggregateType<T>>

    /**
     * Group by Expense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExpenseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExpenseGroupByArgs['orderBy'] }
        : { orderBy?: ExpenseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExpenseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExpenseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Expense model
   */
  readonly fields: ExpenseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Expense.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExpenseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends Expense$createdByArgs<ExtArgs> = {}>(args?: Subset<T, Expense$createdByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    updatedBy<T extends Expense$updatedByArgs<ExtArgs> = {}>(args?: Subset<T, Expense$updatedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Expense model
   */
  interface ExpenseFieldRefs {
    readonly id: FieldRef<"Expense", 'String'>
    readonly title: FieldRef<"Expense", 'String'>
    readonly amount: FieldRef<"Expense", 'Decimal'>
    readonly category: FieldRef<"Expense", 'ExpenseCategory'>
    readonly month: FieldRef<"Expense", 'Int'>
    readonly year: FieldRef<"Expense", 'Int'>
    readonly note: FieldRef<"Expense", 'String'>
    readonly isActive: FieldRef<"Expense", 'Boolean'>
    readonly createdAt: FieldRef<"Expense", 'DateTime'>
    readonly updatedAt: FieldRef<"Expense", 'DateTime'>
    readonly createdById: FieldRef<"Expense", 'String'>
    readonly updatedById: FieldRef<"Expense", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Expense findUnique
   */
  export type ExpenseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense findUniqueOrThrow
   */
  export type ExpenseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense findFirst
   */
  export type ExpenseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Expenses.
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Expenses.
     */
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Expense findFirstOrThrow
   */
  export type ExpenseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Expenses.
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Expenses.
     */
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Expense findMany
   */
  export type ExpenseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter, which Expenses to fetch.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Expenses.
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Expense create
   */
  export type ExpenseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * The data needed to create a Expense.
     */
    data: XOR<ExpenseCreateInput, ExpenseUncheckedCreateInput>
  }

  /**
   * Expense createMany
   */
  export type ExpenseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Expenses.
     */
    data: ExpenseCreateManyInput | ExpenseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Expense createManyAndReturn
   */
  export type ExpenseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * The data used to create many Expenses.
     */
    data: ExpenseCreateManyInput | ExpenseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Expense update
   */
  export type ExpenseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * The data needed to update a Expense.
     */
    data: XOR<ExpenseUpdateInput, ExpenseUncheckedUpdateInput>
    /**
     * Choose, which Expense to update.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense updateMany
   */
  export type ExpenseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Expenses.
     */
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyInput>
    /**
     * Filter which Expenses to update
     */
    where?: ExpenseWhereInput
    /**
     * Limit how many Expenses to update.
     */
    limit?: number
  }

  /**
   * Expense updateManyAndReturn
   */
  export type ExpenseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * The data used to update Expenses.
     */
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyInput>
    /**
     * Filter which Expenses to update
     */
    where?: ExpenseWhereInput
    /**
     * Limit how many Expenses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Expense upsert
   */
  export type ExpenseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * The filter to search for the Expense to update in case it exists.
     */
    where: ExpenseWhereUniqueInput
    /**
     * In case the Expense found by the `where` argument doesn't exist, create a new Expense with this data.
     */
    create: XOR<ExpenseCreateInput, ExpenseUncheckedCreateInput>
    /**
     * In case the Expense was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExpenseUpdateInput, ExpenseUncheckedUpdateInput>
  }

  /**
   * Expense delete
   */
  export type ExpenseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
    /**
     * Filter which Expense to delete.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense deleteMany
   */
  export type ExpenseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Expenses to delete
     */
    where?: ExpenseWhereInput
    /**
     * Limit how many Expenses to delete.
     */
    limit?: number
  }

  /**
   * Expense.createdBy
   */
  export type Expense$createdByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Expense.updatedBy
   */
  export type Expense$updatedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Expense without action
   */
  export type ExpenseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Expense
     */
    omit?: ExpenseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseInclude<ExtArgs> | null
  }


  /**
   * Model ActivityLog
   */

  export type AggregateActivityLog = {
    _count: ActivityLogCountAggregateOutputType | null
    _min: ActivityLogMinAggregateOutputType | null
    _max: ActivityLogMaxAggregateOutputType | null
  }

  export type ActivityLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    action: $Enums.ActivityAction | null
    entityType: string | null
    entityId: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type ActivityLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    action: $Enums.ActivityAction | null
    entityType: string | null
    entityId: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type ActivityLogCountAggregateOutputType = {
    id: number
    userId: number
    action: number
    entityType: number
    entityId: number
    oldValues: number
    newValues: number
    ipAddress: number
    userAgent: number
    createdAt: number
    _all: number
  }


  export type ActivityLogMinAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    entityType?: true
    entityId?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
  }

  export type ActivityLogMaxAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    entityType?: true
    entityId?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
  }

  export type ActivityLogCountAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    entityType?: true
    entityId?: true
    oldValues?: true
    newValues?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
    _all?: true
  }

  export type ActivityLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityLog to aggregate.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActivityLogs
    **/
    _count?: true | ActivityLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityLogMaxAggregateInputType
  }

  export type GetActivityLogAggregateType<T extends ActivityLogAggregateArgs> = {
        [P in keyof T & keyof AggregateActivityLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivityLog[P]>
      : GetScalarType<T[P], AggregateActivityLog[P]>
  }




  export type ActivityLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityLogWhereInput
    orderBy?: ActivityLogOrderByWithAggregationInput | ActivityLogOrderByWithAggregationInput[]
    by: ActivityLogScalarFieldEnum[] | ActivityLogScalarFieldEnum
    having?: ActivityLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityLogCountAggregateInputType | true
    _min?: ActivityLogMinAggregateInputType
    _max?: ActivityLogMaxAggregateInputType
  }

  export type ActivityLogGroupByOutputType = {
    id: string
    userId: string | null
    action: $Enums.ActivityAction
    entityType: string
    entityId: string | null
    oldValues: JsonValue | null
    newValues: JsonValue | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date
    _count: ActivityLogCountAggregateOutputType | null
    _min: ActivityLogMinAggregateOutputType | null
    _max: ActivityLogMaxAggregateOutputType | null
  }

  type GetActivityLogGroupByPayload<T extends ActivityLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityLogGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityLogGroupByOutputType[P]>
        }
      >
    >


  export type ActivityLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    oldValues?: boolean
    newValues?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    user?: boolean | ActivityLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    oldValues?: boolean
    newValues?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    user?: boolean | ActivityLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    oldValues?: boolean
    newValues?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    user?: boolean | ActivityLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectScalar = {
    id?: boolean
    userId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    oldValues?: boolean
    newValues?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }

  export type ActivityLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "action" | "entityType" | "entityId" | "oldValues" | "newValues" | "ipAddress" | "userAgent" | "createdAt", ExtArgs["result"]["activityLog"]>
  export type ActivityLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | ActivityLog$userArgs<ExtArgs>
  }
  export type ActivityLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | ActivityLog$userArgs<ExtArgs>
  }
  export type ActivityLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | ActivityLog$userArgs<ExtArgs>
  }

  export type $ActivityLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActivityLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      action: $Enums.ActivityAction
      entityType: string
      entityId: string | null
      oldValues: Prisma.JsonValue | null
      newValues: Prisma.JsonValue | null
      ipAddress: string | null
      userAgent: string | null
      createdAt: Date
    }, ExtArgs["result"]["activityLog"]>
    composites: {}
  }

  type ActivityLogGetPayload<S extends boolean | null | undefined | ActivityLogDefaultArgs> = $Result.GetResult<Prisma.$ActivityLogPayload, S>

  type ActivityLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActivityLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivityLogCountAggregateInputType | true
    }

  export interface ActivityLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActivityLog'], meta: { name: 'ActivityLog' } }
    /**
     * Find zero or one ActivityLog that matches the filter.
     * @param {ActivityLogFindUniqueArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityLogFindUniqueArgs>(args: SelectSubset<T, ActivityLogFindUniqueArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ActivityLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActivityLogFindUniqueOrThrowArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivityLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindFirstArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityLogFindFirstArgs>(args?: SelectSubset<T, ActivityLogFindFirstArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivityLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindFirstOrThrowArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActivityLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActivityLogs
     * const activityLogs = await prisma.activityLog.findMany()
     * 
     * // Get first 10 ActivityLogs
     * const activityLogs = await prisma.activityLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityLogFindManyArgs>(args?: SelectSubset<T, ActivityLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ActivityLog.
     * @param {ActivityLogCreateArgs} args - Arguments to create a ActivityLog.
     * @example
     * // Create one ActivityLog
     * const ActivityLog = await prisma.activityLog.create({
     *   data: {
     *     // ... data to create a ActivityLog
     *   }
     * })
     * 
     */
    create<T extends ActivityLogCreateArgs>(args: SelectSubset<T, ActivityLogCreateArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ActivityLogs.
     * @param {ActivityLogCreateManyArgs} args - Arguments to create many ActivityLogs.
     * @example
     * // Create many ActivityLogs
     * const activityLog = await prisma.activityLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityLogCreateManyArgs>(args?: SelectSubset<T, ActivityLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActivityLogs and returns the data saved in the database.
     * @param {ActivityLogCreateManyAndReturnArgs} args - Arguments to create many ActivityLogs.
     * @example
     * // Create many ActivityLogs
     * const activityLog = await prisma.activityLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActivityLogs and only return the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivityLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivityLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ActivityLog.
     * @param {ActivityLogDeleteArgs} args - Arguments to delete one ActivityLog.
     * @example
     * // Delete one ActivityLog
     * const ActivityLog = await prisma.activityLog.delete({
     *   where: {
     *     // ... filter to delete one ActivityLog
     *   }
     * })
     * 
     */
    delete<T extends ActivityLogDeleteArgs>(args: SelectSubset<T, ActivityLogDeleteArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ActivityLog.
     * @param {ActivityLogUpdateArgs} args - Arguments to update one ActivityLog.
     * @example
     * // Update one ActivityLog
     * const activityLog = await prisma.activityLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityLogUpdateArgs>(args: SelectSubset<T, ActivityLogUpdateArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ActivityLogs.
     * @param {ActivityLogDeleteManyArgs} args - Arguments to filter ActivityLogs to delete.
     * @example
     * // Delete a few ActivityLogs
     * const { count } = await prisma.activityLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityLogDeleteManyArgs>(args?: SelectSubset<T, ActivityLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActivityLogs
     * const activityLog = await prisma.activityLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityLogUpdateManyArgs>(args: SelectSubset<T, ActivityLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityLogs and returns the data updated in the database.
     * @param {ActivityLogUpdateManyAndReturnArgs} args - Arguments to update many ActivityLogs.
     * @example
     * // Update many ActivityLogs
     * const activityLog = await prisma.activityLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ActivityLogs and only return the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActivityLogUpdateManyAndReturnArgs>(args: SelectSubset<T, ActivityLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ActivityLog.
     * @param {ActivityLogUpsertArgs} args - Arguments to update or create a ActivityLog.
     * @example
     * // Update or create a ActivityLog
     * const activityLog = await prisma.activityLog.upsert({
     *   create: {
     *     // ... data to create a ActivityLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActivityLog we want to update
     *   }
     * })
     */
    upsert<T extends ActivityLogUpsertArgs>(args: SelectSubset<T, ActivityLogUpsertArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogCountArgs} args - Arguments to filter ActivityLogs to count.
     * @example
     * // Count the number of ActivityLogs
     * const count = await prisma.activityLog.count({
     *   where: {
     *     // ... the filter for the ActivityLogs we want to count
     *   }
     * })
    **/
    count<T extends ActivityLogCountArgs>(
      args?: Subset<T, ActivityLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivityLogAggregateArgs>(args: Subset<T, ActivityLogAggregateArgs>): Prisma.PrismaPromise<GetActivityLogAggregateType<T>>

    /**
     * Group by ActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivityLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityLogGroupByArgs['orderBy'] }
        : { orderBy?: ActivityLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActivityLog model
   */
  readonly fields: ActivityLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActivityLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends ActivityLog$userArgs<ExtArgs> = {}>(args?: Subset<T, ActivityLog$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActivityLog model
   */
  interface ActivityLogFieldRefs {
    readonly id: FieldRef<"ActivityLog", 'String'>
    readonly userId: FieldRef<"ActivityLog", 'String'>
    readonly action: FieldRef<"ActivityLog", 'ActivityAction'>
    readonly entityType: FieldRef<"ActivityLog", 'String'>
    readonly entityId: FieldRef<"ActivityLog", 'String'>
    readonly oldValues: FieldRef<"ActivityLog", 'Json'>
    readonly newValues: FieldRef<"ActivityLog", 'Json'>
    readonly ipAddress: FieldRef<"ActivityLog", 'String'>
    readonly userAgent: FieldRef<"ActivityLog", 'String'>
    readonly createdAt: FieldRef<"ActivityLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ActivityLog findUnique
   */
  export type ActivityLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog findUniqueOrThrow
   */
  export type ActivityLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog findFirst
   */
  export type ActivityLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityLogs.
     */
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog findFirstOrThrow
   */
  export type ActivityLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityLogs.
     */
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog findMany
   */
  export type ActivityLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLogs to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog create
   */
  export type ActivityLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The data needed to create a ActivityLog.
     */
    data: XOR<ActivityLogCreateInput, ActivityLogUncheckedCreateInput>
  }

  /**
   * ActivityLog createMany
   */
  export type ActivityLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActivityLogs.
     */
    data: ActivityLogCreateManyInput | ActivityLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActivityLog createManyAndReturn
   */
  export type ActivityLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The data used to create many ActivityLogs.
     */
    data: ActivityLogCreateManyInput | ActivityLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActivityLog update
   */
  export type ActivityLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The data needed to update a ActivityLog.
     */
    data: XOR<ActivityLogUpdateInput, ActivityLogUncheckedUpdateInput>
    /**
     * Choose, which ActivityLog to update.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog updateMany
   */
  export type ActivityLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActivityLogs.
     */
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which ActivityLogs to update
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to update.
     */
    limit?: number
  }

  /**
   * ActivityLog updateManyAndReturn
   */
  export type ActivityLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The data used to update ActivityLogs.
     */
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which ActivityLogs to update
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActivityLog upsert
   */
  export type ActivityLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The filter to search for the ActivityLog to update in case it exists.
     */
    where: ActivityLogWhereUniqueInput
    /**
     * In case the ActivityLog found by the `where` argument doesn't exist, create a new ActivityLog with this data.
     */
    create: XOR<ActivityLogCreateInput, ActivityLogUncheckedCreateInput>
    /**
     * In case the ActivityLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityLogUpdateInput, ActivityLogUncheckedUpdateInput>
  }

  /**
   * ActivityLog delete
   */
  export type ActivityLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter which ActivityLog to delete.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog deleteMany
   */
  export type ActivityLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityLogs to delete
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to delete.
     */
    limit?: number
  }

  /**
   * ActivityLog.user
   */
  export type ActivityLog$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * ActivityLog without action
   */
  export type ActivityLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    fullName: 'fullName',
    tel: 'tel',
    avatarUrl: 'avatarUrl',
    role: 'role',
    isActive: 'isActive',
    emailVerified: 'emailVerified',
    mustChangePassword: 'mustChangePassword',
    emailVerificationToken: 'emailVerificationToken',
    passwordResetToken: 'passwordResetToken',
    passwordResetExpires: 'passwordResetExpires',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lastLogin: 'lastLogin'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RefreshTokenScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    jti: 'jti',
    token: 'token',
    deviceInfo: 'deviceInfo',
    ipAddress: 'ipAddress',
    expiresAt: 'expiresAt',
    isRevoked: 'isRevoked',
    revokedAt: 'revokedAt',
    revokedBy: 'revokedBy',
    createdAt: 'createdAt',
    lastUsedAt: 'lastUsedAt'
  };

  export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum]


  export const TravelAgencyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    tel: 'tel',
    address: 'address',
    note: 'note',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdById: 'createdById',
    updatedById: 'updatedById'
  };

  export type TravelAgencyScalarFieldEnum = (typeof TravelAgencyScalarFieldEnum)[keyof typeof TravelAgencyScalarFieldEnum]


  export const CarBookingScalarFieldEnum: {
    id: 'id',
    bookingCode: 'bookingCode',
    travelAgencyId: 'travelAgencyId',
    vehicleType: 'vehicleType',
    serviceDate: 'serviceDate',
    guestName: 'guestName',
    guestPhone: 'guestPhone',
    guestCount: 'guestCount',
    pickupLocation: 'pickupLocation',
    dropoffLocation: 'dropoffLocation',
    vat: 'vat',
    sellingPrice: 'sellingPrice',
    receivingPrice: 'receivingPrice',
    debtAmount: 'debtAmount',
    paymentCollection: 'paymentCollection',
    paymentCollectionNote: 'paymentCollectionNote',
    paymentStatus: 'paymentStatus',
    paidAt: 'paidAt',
    status: 'status',
    note: 'note',
    routes: 'routes',
    isTransfer: 'isTransfer',
    transferFromId: 'transferFromId',
    transferToAgencyId: 'transferToAgencyId',
    transferReason: 'transferReason',
    transferredAt: 'transferredAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdById: 'createdById',
    updatedById: 'updatedById'
  };

  export type CarBookingScalarFieldEnum = (typeof CarBookingScalarFieldEnum)[keyof typeof CarBookingScalarFieldEnum]


  export const PaymentRecordScalarFieldEnum: {
    id: 'id',
    partnerType: 'partnerType',
    partnerId: 'partnerId',
    debtRecordId: 'debtRecordId',
    paymentDirection: 'paymentDirection',
    amount: 'amount',
    paymentDate: 'paymentDate',
    paymentMethod: 'paymentMethod',
    referenceNumber: 'referenceNumber',
    note: 'note',
    receiptUrl: 'receiptUrl',
    createdAt: 'createdAt',
    createdById: 'createdById'
  };

  export type PaymentRecordScalarFieldEnum = (typeof PaymentRecordScalarFieldEnum)[keyof typeof PaymentRecordScalarFieldEnum]


  export const ExpenseScalarFieldEnum: {
    id: 'id',
    title: 'title',
    amount: 'amount',
    category: 'category',
    month: 'month',
    year: 'year',
    note: 'note',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdById: 'createdById',
    updatedById: 'updatedById'
  };

  export type ExpenseScalarFieldEnum = (typeof ExpenseScalarFieldEnum)[keyof typeof ExpenseScalarFieldEnum]


  export const ActivityLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    action: 'action',
    entityType: 'entityType',
    entityId: 'entityId',
    oldValues: 'oldValues',
    newValues: 'newValues',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    createdAt: 'createdAt'
  };

  export type ActivityLogScalarFieldEnum = (typeof ActivityLogScalarFieldEnum)[keyof typeof ActivityLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'TransportType'
   */
  export type EnumTransportTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransportType'>
    


  /**
   * Reference to a field of type 'TransportType[]'
   */
  export type ListEnumTransportTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransportType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'PaymentCollection'
   */
  export type EnumPaymentCollectionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentCollection'>
    


  /**
   * Reference to a field of type 'PaymentCollection[]'
   */
  export type ListEnumPaymentCollectionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentCollection[]'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>
    


  /**
   * Reference to a field of type 'CarBookingStatus'
   */
  export type EnumCarBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CarBookingStatus'>
    


  /**
   * Reference to a field of type 'CarBookingStatus[]'
   */
  export type ListEnumCarBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CarBookingStatus[]'>
    


  /**
   * Reference to a field of type 'PartnerType'
   */
  export type EnumPartnerTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PartnerType'>
    


  /**
   * Reference to a field of type 'PartnerType[]'
   */
  export type ListEnumPartnerTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PartnerType[]'>
    


  /**
   * Reference to a field of type 'PaymentDirection'
   */
  export type EnumPaymentDirectionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentDirection'>
    


  /**
   * Reference to a field of type 'PaymentDirection[]'
   */
  export type ListEnumPaymentDirectionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentDirection[]'>
    


  /**
   * Reference to a field of type 'ExpenseCategory'
   */
  export type EnumExpenseCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExpenseCategory'>
    


  /**
   * Reference to a field of type 'ExpenseCategory[]'
   */
  export type ListEnumExpenseCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExpenseCategory[]'>
    


  /**
   * Reference to a field of type 'ActivityAction'
   */
  export type EnumActivityActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ActivityAction'>
    


  /**
   * Reference to a field of type 'ActivityAction[]'
   */
  export type ListEnumActivityActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ActivityAction[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: UuidFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    tel?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    isActive?: BoolFilter<"User"> | boolean
    emailVerified?: BoolFilter<"User"> | boolean
    mustChangePassword?: BoolFilter<"User"> | boolean
    emailVerificationToken?: StringNullableFilter<"User"> | string | null
    passwordResetToken?: StringNullableFilter<"User"> | string | null
    passwordResetExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    refreshTokens?: RefreshTokenListRelationFilter
    activityLogs?: ActivityLogListRelationFilter
    createdTravelAgencies?: TravelAgencyListRelationFilter
    updatedTravelAgencies?: TravelAgencyListRelationFilter
    createdCarBookings?: CarBookingListRelationFilter
    updatedCarBookings?: CarBookingListRelationFilter
    createdPaymentRecords?: PaymentRecordListRelationFilter
    createdExpenses?: ExpenseListRelationFilter
    updatedExpenses?: ExpenseListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    tel?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    role?: SortOrder
    isActive?: SortOrder
    emailVerified?: SortOrder
    mustChangePassword?: SortOrder
    emailVerificationToken?: SortOrderInput | SortOrder
    passwordResetToken?: SortOrderInput | SortOrder
    passwordResetExpires?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    refreshTokens?: RefreshTokenOrderByRelationAggregateInput
    activityLogs?: ActivityLogOrderByRelationAggregateInput
    createdTravelAgencies?: TravelAgencyOrderByRelationAggregateInput
    updatedTravelAgencies?: TravelAgencyOrderByRelationAggregateInput
    createdCarBookings?: CarBookingOrderByRelationAggregateInput
    updatedCarBookings?: CarBookingOrderByRelationAggregateInput
    createdPaymentRecords?: PaymentRecordOrderByRelationAggregateInput
    createdExpenses?: ExpenseOrderByRelationAggregateInput
    updatedExpenses?: ExpenseOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    tel?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    isActive?: BoolFilter<"User"> | boolean
    emailVerified?: BoolFilter<"User"> | boolean
    mustChangePassword?: BoolFilter<"User"> | boolean
    emailVerificationToken?: StringNullableFilter<"User"> | string | null
    passwordResetToken?: StringNullableFilter<"User"> | string | null
    passwordResetExpires?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    refreshTokens?: RefreshTokenListRelationFilter
    activityLogs?: ActivityLogListRelationFilter
    createdTravelAgencies?: TravelAgencyListRelationFilter
    updatedTravelAgencies?: TravelAgencyListRelationFilter
    createdCarBookings?: CarBookingListRelationFilter
    updatedCarBookings?: CarBookingListRelationFilter
    createdPaymentRecords?: PaymentRecordListRelationFilter
    createdExpenses?: ExpenseListRelationFilter
    updatedExpenses?: ExpenseListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    tel?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    role?: SortOrder
    isActive?: SortOrder
    emailVerified?: SortOrder
    mustChangePassword?: SortOrder
    emailVerificationToken?: SortOrderInput | SortOrder
    passwordResetToken?: SortOrderInput | SortOrder
    passwordResetExpires?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    fullName?: StringWithAggregatesFilter<"User"> | string
    tel?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    mustChangePassword?: BoolWithAggregatesFilter<"User"> | boolean
    emailVerificationToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordResetToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordResetExpires?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    lastLogin?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type RefreshTokenWhereInput = {
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    id?: UuidFilter<"RefreshToken"> | string
    userId?: UuidFilter<"RefreshToken"> | string
    jti?: StringFilter<"RefreshToken"> | string
    token?: StringFilter<"RefreshToken"> | string
    deviceInfo?: StringNullableFilter<"RefreshToken"> | string | null
    ipAddress?: StringNullableFilter<"RefreshToken"> | string | null
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    isRevoked?: BoolFilter<"RefreshToken"> | boolean
    revokedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    revokedBy?: UuidNullableFilter<"RefreshToken"> | string | null
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    lastUsedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RefreshTokenOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    jti?: SortOrder
    token?: SortOrder
    deviceInfo?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    isRevoked?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    revokedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type RefreshTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    jti?: string
    token?: string
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    userId?: UuidFilter<"RefreshToken"> | string
    deviceInfo?: StringNullableFilter<"RefreshToken"> | string | null
    ipAddress?: StringNullableFilter<"RefreshToken"> | string | null
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    isRevoked?: BoolFilter<"RefreshToken"> | boolean
    revokedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    revokedBy?: UuidNullableFilter<"RefreshToken"> | string | null
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    lastUsedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "jti" | "token">

  export type RefreshTokenOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    jti?: SortOrder
    token?: SortOrder
    deviceInfo?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    isRevoked?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    revokedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    _count?: RefreshTokenCountOrderByAggregateInput
    _max?: RefreshTokenMaxOrderByAggregateInput
    _min?: RefreshTokenMinOrderByAggregateInput
  }

  export type RefreshTokenScalarWhereWithAggregatesInput = {
    AND?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    OR?: RefreshTokenScalarWhereWithAggregatesInput[]
    NOT?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"RefreshToken"> | string
    userId?: UuidWithAggregatesFilter<"RefreshToken"> | string
    jti?: StringWithAggregatesFilter<"RefreshToken"> | string
    token?: StringWithAggregatesFilter<"RefreshToken"> | string
    deviceInfo?: StringNullableWithAggregatesFilter<"RefreshToken"> | string | null
    ipAddress?: StringNullableWithAggregatesFilter<"RefreshToken"> | string | null
    expiresAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    isRevoked?: BoolWithAggregatesFilter<"RefreshToken"> | boolean
    revokedAt?: DateTimeNullableWithAggregatesFilter<"RefreshToken"> | Date | string | null
    revokedBy?: UuidNullableWithAggregatesFilter<"RefreshToken"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    lastUsedAt?: DateTimeNullableWithAggregatesFilter<"RefreshToken"> | Date | string | null
  }

  export type TravelAgencyWhereInput = {
    AND?: TravelAgencyWhereInput | TravelAgencyWhereInput[]
    OR?: TravelAgencyWhereInput[]
    NOT?: TravelAgencyWhereInput | TravelAgencyWhereInput[]
    id?: UuidFilter<"TravelAgency"> | string
    name?: StringFilter<"TravelAgency"> | string
    tel?: StringNullableFilter<"TravelAgency"> | string | null
    address?: StringNullableFilter<"TravelAgency"> | string | null
    note?: StringNullableFilter<"TravelAgency"> | string | null
    isActive?: BoolFilter<"TravelAgency"> | boolean
    createdAt?: DateTimeFilter<"TravelAgency"> | Date | string
    updatedAt?: DateTimeFilter<"TravelAgency"> | Date | string
    createdById?: UuidNullableFilter<"TravelAgency"> | string | null
    updatedById?: UuidNullableFilter<"TravelAgency"> | string | null
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    updatedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    carBookings?: CarBookingListRelationFilter
    transferredCarBookings?: CarBookingListRelationFilter
  }

  export type TravelAgencyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    tel?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrderInput | SortOrder
    updatedById?: SortOrderInput | SortOrder
    createdBy?: UserOrderByWithRelationInput
    updatedBy?: UserOrderByWithRelationInput
    carBookings?: CarBookingOrderByRelationAggregateInput
    transferredCarBookings?: CarBookingOrderByRelationAggregateInput
  }

  export type TravelAgencyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TravelAgencyWhereInput | TravelAgencyWhereInput[]
    OR?: TravelAgencyWhereInput[]
    NOT?: TravelAgencyWhereInput | TravelAgencyWhereInput[]
    name?: StringFilter<"TravelAgency"> | string
    tel?: StringNullableFilter<"TravelAgency"> | string | null
    address?: StringNullableFilter<"TravelAgency"> | string | null
    note?: StringNullableFilter<"TravelAgency"> | string | null
    isActive?: BoolFilter<"TravelAgency"> | boolean
    createdAt?: DateTimeFilter<"TravelAgency"> | Date | string
    updatedAt?: DateTimeFilter<"TravelAgency"> | Date | string
    createdById?: UuidNullableFilter<"TravelAgency"> | string | null
    updatedById?: UuidNullableFilter<"TravelAgency"> | string | null
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    updatedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    carBookings?: CarBookingListRelationFilter
    transferredCarBookings?: CarBookingListRelationFilter
  }, "id">

  export type TravelAgencyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    tel?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrderInput | SortOrder
    updatedById?: SortOrderInput | SortOrder
    _count?: TravelAgencyCountOrderByAggregateInput
    _max?: TravelAgencyMaxOrderByAggregateInput
    _min?: TravelAgencyMinOrderByAggregateInput
  }

  export type TravelAgencyScalarWhereWithAggregatesInput = {
    AND?: TravelAgencyScalarWhereWithAggregatesInput | TravelAgencyScalarWhereWithAggregatesInput[]
    OR?: TravelAgencyScalarWhereWithAggregatesInput[]
    NOT?: TravelAgencyScalarWhereWithAggregatesInput | TravelAgencyScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"TravelAgency"> | string
    name?: StringWithAggregatesFilter<"TravelAgency"> | string
    tel?: StringNullableWithAggregatesFilter<"TravelAgency"> | string | null
    address?: StringNullableWithAggregatesFilter<"TravelAgency"> | string | null
    note?: StringNullableWithAggregatesFilter<"TravelAgency"> | string | null
    isActive?: BoolWithAggregatesFilter<"TravelAgency"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"TravelAgency"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TravelAgency"> | Date | string
    createdById?: UuidNullableWithAggregatesFilter<"TravelAgency"> | string | null
    updatedById?: UuidNullableWithAggregatesFilter<"TravelAgency"> | string | null
  }

  export type CarBookingWhereInput = {
    AND?: CarBookingWhereInput | CarBookingWhereInput[]
    OR?: CarBookingWhereInput[]
    NOT?: CarBookingWhereInput | CarBookingWhereInput[]
    id?: UuidFilter<"CarBooking"> | string
    bookingCode?: StringFilter<"CarBooking"> | string
    travelAgencyId?: UuidNullableFilter<"CarBooking"> | string | null
    vehicleType?: EnumTransportTypeFilter<"CarBooking"> | $Enums.TransportType
    serviceDate?: DateTimeFilter<"CarBooking"> | Date | string
    guestName?: StringFilter<"CarBooking"> | string
    guestPhone?: StringNullableFilter<"CarBooking"> | string | null
    guestCount?: IntFilter<"CarBooking"> | number
    pickupLocation?: StringNullableFilter<"CarBooking"> | string | null
    dropoffLocation?: StringNullableFilter<"CarBooking"> | string | null
    vat?: BoolFilter<"CarBooking"> | boolean
    sellingPrice?: DecimalFilter<"CarBooking"> | Decimal | DecimalJsLike | number | string
    receivingPrice?: DecimalFilter<"CarBooking"> | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFilter<"CarBooking"> | Decimal | DecimalJsLike | number | string
    paymentCollection?: EnumPaymentCollectionFilter<"CarBooking"> | $Enums.PaymentCollection
    paymentCollectionNote?: StringNullableFilter<"CarBooking"> | string | null
    paymentStatus?: EnumPaymentStatusFilter<"CarBooking"> | $Enums.PaymentStatus
    paidAt?: DateTimeNullableFilter<"CarBooking"> | Date | string | null
    status?: EnumCarBookingStatusFilter<"CarBooking"> | $Enums.CarBookingStatus
    note?: StringNullableFilter<"CarBooking"> | string | null
    routes?: StringNullableFilter<"CarBooking"> | string | null
    isTransfer?: BoolFilter<"CarBooking"> | boolean
    transferFromId?: UuidNullableFilter<"CarBooking"> | string | null
    transferToAgencyId?: UuidNullableFilter<"CarBooking"> | string | null
    transferReason?: StringNullableFilter<"CarBooking"> | string | null
    transferredAt?: DateTimeNullableFilter<"CarBooking"> | Date | string | null
    createdAt?: DateTimeFilter<"CarBooking"> | Date | string
    updatedAt?: DateTimeFilter<"CarBooking"> | Date | string
    createdById?: UuidNullableFilter<"CarBooking"> | string | null
    updatedById?: UuidNullableFilter<"CarBooking"> | string | null
    travelAgency?: XOR<TravelAgencyNullableScalarRelationFilter, TravelAgencyWhereInput> | null
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    updatedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    transferFrom?: XOR<CarBookingNullableScalarRelationFilter, CarBookingWhereInput> | null
    transferBookings?: CarBookingListRelationFilter
    transferToAgency?: XOR<TravelAgencyNullableScalarRelationFilter, TravelAgencyWhereInput> | null
  }

  export type CarBookingOrderByWithRelationInput = {
    id?: SortOrder
    bookingCode?: SortOrder
    travelAgencyId?: SortOrderInput | SortOrder
    vehicleType?: SortOrder
    serviceDate?: SortOrder
    guestName?: SortOrder
    guestPhone?: SortOrderInput | SortOrder
    guestCount?: SortOrder
    pickupLocation?: SortOrderInput | SortOrder
    dropoffLocation?: SortOrderInput | SortOrder
    vat?: SortOrder
    sellingPrice?: SortOrder
    receivingPrice?: SortOrder
    debtAmount?: SortOrder
    paymentCollection?: SortOrder
    paymentCollectionNote?: SortOrderInput | SortOrder
    paymentStatus?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    status?: SortOrder
    note?: SortOrderInput | SortOrder
    routes?: SortOrderInput | SortOrder
    isTransfer?: SortOrder
    transferFromId?: SortOrderInput | SortOrder
    transferToAgencyId?: SortOrderInput | SortOrder
    transferReason?: SortOrderInput | SortOrder
    transferredAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrderInput | SortOrder
    updatedById?: SortOrderInput | SortOrder
    travelAgency?: TravelAgencyOrderByWithRelationInput
    createdBy?: UserOrderByWithRelationInput
    updatedBy?: UserOrderByWithRelationInput
    transferFrom?: CarBookingOrderByWithRelationInput
    transferBookings?: CarBookingOrderByRelationAggregateInput
    transferToAgency?: TravelAgencyOrderByWithRelationInput
  }

  export type CarBookingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    bookingCode?: string
    AND?: CarBookingWhereInput | CarBookingWhereInput[]
    OR?: CarBookingWhereInput[]
    NOT?: CarBookingWhereInput | CarBookingWhereInput[]
    travelAgencyId?: UuidNullableFilter<"CarBooking"> | string | null
    vehicleType?: EnumTransportTypeFilter<"CarBooking"> | $Enums.TransportType
    serviceDate?: DateTimeFilter<"CarBooking"> | Date | string
    guestName?: StringFilter<"CarBooking"> | string
    guestPhone?: StringNullableFilter<"CarBooking"> | string | null
    guestCount?: IntFilter<"CarBooking"> | number
    pickupLocation?: StringNullableFilter<"CarBooking"> | string | null
    dropoffLocation?: StringNullableFilter<"CarBooking"> | string | null
    vat?: BoolFilter<"CarBooking"> | boolean
    sellingPrice?: DecimalFilter<"CarBooking"> | Decimal | DecimalJsLike | number | string
    receivingPrice?: DecimalFilter<"CarBooking"> | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFilter<"CarBooking"> | Decimal | DecimalJsLike | number | string
    paymentCollection?: EnumPaymentCollectionFilter<"CarBooking"> | $Enums.PaymentCollection
    paymentCollectionNote?: StringNullableFilter<"CarBooking"> | string | null
    paymentStatus?: EnumPaymentStatusFilter<"CarBooking"> | $Enums.PaymentStatus
    paidAt?: DateTimeNullableFilter<"CarBooking"> | Date | string | null
    status?: EnumCarBookingStatusFilter<"CarBooking"> | $Enums.CarBookingStatus
    note?: StringNullableFilter<"CarBooking"> | string | null
    routes?: StringNullableFilter<"CarBooking"> | string | null
    isTransfer?: BoolFilter<"CarBooking"> | boolean
    transferFromId?: UuidNullableFilter<"CarBooking"> | string | null
    transferToAgencyId?: UuidNullableFilter<"CarBooking"> | string | null
    transferReason?: StringNullableFilter<"CarBooking"> | string | null
    transferredAt?: DateTimeNullableFilter<"CarBooking"> | Date | string | null
    createdAt?: DateTimeFilter<"CarBooking"> | Date | string
    updatedAt?: DateTimeFilter<"CarBooking"> | Date | string
    createdById?: UuidNullableFilter<"CarBooking"> | string | null
    updatedById?: UuidNullableFilter<"CarBooking"> | string | null
    travelAgency?: XOR<TravelAgencyNullableScalarRelationFilter, TravelAgencyWhereInput> | null
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    updatedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    transferFrom?: XOR<CarBookingNullableScalarRelationFilter, CarBookingWhereInput> | null
    transferBookings?: CarBookingListRelationFilter
    transferToAgency?: XOR<TravelAgencyNullableScalarRelationFilter, TravelAgencyWhereInput> | null
  }, "id" | "bookingCode">

  export type CarBookingOrderByWithAggregationInput = {
    id?: SortOrder
    bookingCode?: SortOrder
    travelAgencyId?: SortOrderInput | SortOrder
    vehicleType?: SortOrder
    serviceDate?: SortOrder
    guestName?: SortOrder
    guestPhone?: SortOrderInput | SortOrder
    guestCount?: SortOrder
    pickupLocation?: SortOrderInput | SortOrder
    dropoffLocation?: SortOrderInput | SortOrder
    vat?: SortOrder
    sellingPrice?: SortOrder
    receivingPrice?: SortOrder
    debtAmount?: SortOrder
    paymentCollection?: SortOrder
    paymentCollectionNote?: SortOrderInput | SortOrder
    paymentStatus?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    status?: SortOrder
    note?: SortOrderInput | SortOrder
    routes?: SortOrderInput | SortOrder
    isTransfer?: SortOrder
    transferFromId?: SortOrderInput | SortOrder
    transferToAgencyId?: SortOrderInput | SortOrder
    transferReason?: SortOrderInput | SortOrder
    transferredAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrderInput | SortOrder
    updatedById?: SortOrderInput | SortOrder
    _count?: CarBookingCountOrderByAggregateInput
    _avg?: CarBookingAvgOrderByAggregateInput
    _max?: CarBookingMaxOrderByAggregateInput
    _min?: CarBookingMinOrderByAggregateInput
    _sum?: CarBookingSumOrderByAggregateInput
  }

  export type CarBookingScalarWhereWithAggregatesInput = {
    AND?: CarBookingScalarWhereWithAggregatesInput | CarBookingScalarWhereWithAggregatesInput[]
    OR?: CarBookingScalarWhereWithAggregatesInput[]
    NOT?: CarBookingScalarWhereWithAggregatesInput | CarBookingScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"CarBooking"> | string
    bookingCode?: StringWithAggregatesFilter<"CarBooking"> | string
    travelAgencyId?: UuidNullableWithAggregatesFilter<"CarBooking"> | string | null
    vehicleType?: EnumTransportTypeWithAggregatesFilter<"CarBooking"> | $Enums.TransportType
    serviceDate?: DateTimeWithAggregatesFilter<"CarBooking"> | Date | string
    guestName?: StringWithAggregatesFilter<"CarBooking"> | string
    guestPhone?: StringNullableWithAggregatesFilter<"CarBooking"> | string | null
    guestCount?: IntWithAggregatesFilter<"CarBooking"> | number
    pickupLocation?: StringNullableWithAggregatesFilter<"CarBooking"> | string | null
    dropoffLocation?: StringNullableWithAggregatesFilter<"CarBooking"> | string | null
    vat?: BoolWithAggregatesFilter<"CarBooking"> | boolean
    sellingPrice?: DecimalWithAggregatesFilter<"CarBooking"> | Decimal | DecimalJsLike | number | string
    receivingPrice?: DecimalWithAggregatesFilter<"CarBooking"> | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalWithAggregatesFilter<"CarBooking"> | Decimal | DecimalJsLike | number | string
    paymentCollection?: EnumPaymentCollectionWithAggregatesFilter<"CarBooking"> | $Enums.PaymentCollection
    paymentCollectionNote?: StringNullableWithAggregatesFilter<"CarBooking"> | string | null
    paymentStatus?: EnumPaymentStatusWithAggregatesFilter<"CarBooking"> | $Enums.PaymentStatus
    paidAt?: DateTimeNullableWithAggregatesFilter<"CarBooking"> | Date | string | null
    status?: EnumCarBookingStatusWithAggregatesFilter<"CarBooking"> | $Enums.CarBookingStatus
    note?: StringNullableWithAggregatesFilter<"CarBooking"> | string | null
    routes?: StringNullableWithAggregatesFilter<"CarBooking"> | string | null
    isTransfer?: BoolWithAggregatesFilter<"CarBooking"> | boolean
    transferFromId?: UuidNullableWithAggregatesFilter<"CarBooking"> | string | null
    transferToAgencyId?: UuidNullableWithAggregatesFilter<"CarBooking"> | string | null
    transferReason?: StringNullableWithAggregatesFilter<"CarBooking"> | string | null
    transferredAt?: DateTimeNullableWithAggregatesFilter<"CarBooking"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CarBooking"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CarBooking"> | Date | string
    createdById?: UuidNullableWithAggregatesFilter<"CarBooking"> | string | null
    updatedById?: UuidNullableWithAggregatesFilter<"CarBooking"> | string | null
  }

  export type PaymentRecordWhereInput = {
    AND?: PaymentRecordWhereInput | PaymentRecordWhereInput[]
    OR?: PaymentRecordWhereInput[]
    NOT?: PaymentRecordWhereInput | PaymentRecordWhereInput[]
    id?: UuidFilter<"PaymentRecord"> | string
    partnerType?: EnumPartnerTypeFilter<"PaymentRecord"> | $Enums.PartnerType
    partnerId?: UuidFilter<"PaymentRecord"> | string
    debtRecordId?: UuidNullableFilter<"PaymentRecord"> | string | null
    paymentDirection?: EnumPaymentDirectionFilter<"PaymentRecord"> | $Enums.PaymentDirection
    amount?: DecimalFilter<"PaymentRecord"> | Decimal | DecimalJsLike | number | string
    paymentDate?: DateTimeFilter<"PaymentRecord"> | Date | string
    paymentMethod?: StringNullableFilter<"PaymentRecord"> | string | null
    referenceNumber?: StringNullableFilter<"PaymentRecord"> | string | null
    note?: StringNullableFilter<"PaymentRecord"> | string | null
    receiptUrl?: StringNullableFilter<"PaymentRecord"> | string | null
    createdAt?: DateTimeFilter<"PaymentRecord"> | Date | string
    createdById?: UuidNullableFilter<"PaymentRecord"> | string | null
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type PaymentRecordOrderByWithRelationInput = {
    id?: SortOrder
    partnerType?: SortOrder
    partnerId?: SortOrder
    debtRecordId?: SortOrderInput | SortOrder
    paymentDirection?: SortOrder
    amount?: SortOrder
    paymentDate?: SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    referenceNumber?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    receiptUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdById?: SortOrderInput | SortOrder
    createdBy?: UserOrderByWithRelationInput
  }

  export type PaymentRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PaymentRecordWhereInput | PaymentRecordWhereInput[]
    OR?: PaymentRecordWhereInput[]
    NOT?: PaymentRecordWhereInput | PaymentRecordWhereInput[]
    partnerType?: EnumPartnerTypeFilter<"PaymentRecord"> | $Enums.PartnerType
    partnerId?: UuidFilter<"PaymentRecord"> | string
    debtRecordId?: UuidNullableFilter<"PaymentRecord"> | string | null
    paymentDirection?: EnumPaymentDirectionFilter<"PaymentRecord"> | $Enums.PaymentDirection
    amount?: DecimalFilter<"PaymentRecord"> | Decimal | DecimalJsLike | number | string
    paymentDate?: DateTimeFilter<"PaymentRecord"> | Date | string
    paymentMethod?: StringNullableFilter<"PaymentRecord"> | string | null
    referenceNumber?: StringNullableFilter<"PaymentRecord"> | string | null
    note?: StringNullableFilter<"PaymentRecord"> | string | null
    receiptUrl?: StringNullableFilter<"PaymentRecord"> | string | null
    createdAt?: DateTimeFilter<"PaymentRecord"> | Date | string
    createdById?: UuidNullableFilter<"PaymentRecord"> | string | null
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type PaymentRecordOrderByWithAggregationInput = {
    id?: SortOrder
    partnerType?: SortOrder
    partnerId?: SortOrder
    debtRecordId?: SortOrderInput | SortOrder
    paymentDirection?: SortOrder
    amount?: SortOrder
    paymentDate?: SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    referenceNumber?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    receiptUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdById?: SortOrderInput | SortOrder
    _count?: PaymentRecordCountOrderByAggregateInput
    _avg?: PaymentRecordAvgOrderByAggregateInput
    _max?: PaymentRecordMaxOrderByAggregateInput
    _min?: PaymentRecordMinOrderByAggregateInput
    _sum?: PaymentRecordSumOrderByAggregateInput
  }

  export type PaymentRecordScalarWhereWithAggregatesInput = {
    AND?: PaymentRecordScalarWhereWithAggregatesInput | PaymentRecordScalarWhereWithAggregatesInput[]
    OR?: PaymentRecordScalarWhereWithAggregatesInput[]
    NOT?: PaymentRecordScalarWhereWithAggregatesInput | PaymentRecordScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"PaymentRecord"> | string
    partnerType?: EnumPartnerTypeWithAggregatesFilter<"PaymentRecord"> | $Enums.PartnerType
    partnerId?: UuidWithAggregatesFilter<"PaymentRecord"> | string
    debtRecordId?: UuidNullableWithAggregatesFilter<"PaymentRecord"> | string | null
    paymentDirection?: EnumPaymentDirectionWithAggregatesFilter<"PaymentRecord"> | $Enums.PaymentDirection
    amount?: DecimalWithAggregatesFilter<"PaymentRecord"> | Decimal | DecimalJsLike | number | string
    paymentDate?: DateTimeWithAggregatesFilter<"PaymentRecord"> | Date | string
    paymentMethod?: StringNullableWithAggregatesFilter<"PaymentRecord"> | string | null
    referenceNumber?: StringNullableWithAggregatesFilter<"PaymentRecord"> | string | null
    note?: StringNullableWithAggregatesFilter<"PaymentRecord"> | string | null
    receiptUrl?: StringNullableWithAggregatesFilter<"PaymentRecord"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PaymentRecord"> | Date | string
    createdById?: UuidNullableWithAggregatesFilter<"PaymentRecord"> | string | null
  }

  export type ExpenseWhereInput = {
    AND?: ExpenseWhereInput | ExpenseWhereInput[]
    OR?: ExpenseWhereInput[]
    NOT?: ExpenseWhereInput | ExpenseWhereInput[]
    id?: UuidFilter<"Expense"> | string
    title?: StringFilter<"Expense"> | string
    amount?: DecimalFilter<"Expense"> | Decimal | DecimalJsLike | number | string
    category?: EnumExpenseCategoryFilter<"Expense"> | $Enums.ExpenseCategory
    month?: IntFilter<"Expense"> | number
    year?: IntFilter<"Expense"> | number
    note?: StringNullableFilter<"Expense"> | string | null
    isActive?: BoolFilter<"Expense"> | boolean
    createdAt?: DateTimeFilter<"Expense"> | Date | string
    updatedAt?: DateTimeFilter<"Expense"> | Date | string
    createdById?: UuidNullableFilter<"Expense"> | string | null
    updatedById?: UuidNullableFilter<"Expense"> | string | null
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    updatedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type ExpenseOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    amount?: SortOrder
    category?: SortOrder
    month?: SortOrder
    year?: SortOrder
    note?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrderInput | SortOrder
    updatedById?: SortOrderInput | SortOrder
    createdBy?: UserOrderByWithRelationInput
    updatedBy?: UserOrderByWithRelationInput
  }

  export type ExpenseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExpenseWhereInput | ExpenseWhereInput[]
    OR?: ExpenseWhereInput[]
    NOT?: ExpenseWhereInput | ExpenseWhereInput[]
    title?: StringFilter<"Expense"> | string
    amount?: DecimalFilter<"Expense"> | Decimal | DecimalJsLike | number | string
    category?: EnumExpenseCategoryFilter<"Expense"> | $Enums.ExpenseCategory
    month?: IntFilter<"Expense"> | number
    year?: IntFilter<"Expense"> | number
    note?: StringNullableFilter<"Expense"> | string | null
    isActive?: BoolFilter<"Expense"> | boolean
    createdAt?: DateTimeFilter<"Expense"> | Date | string
    updatedAt?: DateTimeFilter<"Expense"> | Date | string
    createdById?: UuidNullableFilter<"Expense"> | string | null
    updatedById?: UuidNullableFilter<"Expense"> | string | null
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    updatedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type ExpenseOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    amount?: SortOrder
    category?: SortOrder
    month?: SortOrder
    year?: SortOrder
    note?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrderInput | SortOrder
    updatedById?: SortOrderInput | SortOrder
    _count?: ExpenseCountOrderByAggregateInput
    _avg?: ExpenseAvgOrderByAggregateInput
    _max?: ExpenseMaxOrderByAggregateInput
    _min?: ExpenseMinOrderByAggregateInput
    _sum?: ExpenseSumOrderByAggregateInput
  }

  export type ExpenseScalarWhereWithAggregatesInput = {
    AND?: ExpenseScalarWhereWithAggregatesInput | ExpenseScalarWhereWithAggregatesInput[]
    OR?: ExpenseScalarWhereWithAggregatesInput[]
    NOT?: ExpenseScalarWhereWithAggregatesInput | ExpenseScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Expense"> | string
    title?: StringWithAggregatesFilter<"Expense"> | string
    amount?: DecimalWithAggregatesFilter<"Expense"> | Decimal | DecimalJsLike | number | string
    category?: EnumExpenseCategoryWithAggregatesFilter<"Expense"> | $Enums.ExpenseCategory
    month?: IntWithAggregatesFilter<"Expense"> | number
    year?: IntWithAggregatesFilter<"Expense"> | number
    note?: StringNullableWithAggregatesFilter<"Expense"> | string | null
    isActive?: BoolWithAggregatesFilter<"Expense"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Expense"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Expense"> | Date | string
    createdById?: UuidNullableWithAggregatesFilter<"Expense"> | string | null
    updatedById?: UuidNullableWithAggregatesFilter<"Expense"> | string | null
  }

  export type ActivityLogWhereInput = {
    AND?: ActivityLogWhereInput | ActivityLogWhereInput[]
    OR?: ActivityLogWhereInput[]
    NOT?: ActivityLogWhereInput | ActivityLogWhereInput[]
    id?: UuidFilter<"ActivityLog"> | string
    userId?: UuidNullableFilter<"ActivityLog"> | string | null
    action?: EnumActivityActionFilter<"ActivityLog"> | $Enums.ActivityAction
    entityType?: StringFilter<"ActivityLog"> | string
    entityId?: UuidNullableFilter<"ActivityLog"> | string | null
    oldValues?: JsonNullableFilter<"ActivityLog">
    newValues?: JsonNullableFilter<"ActivityLog">
    ipAddress?: StringNullableFilter<"ActivityLog"> | string | null
    userAgent?: StringNullableFilter<"ActivityLog"> | string | null
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type ActivityLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrderInput | SortOrder
    oldValues?: SortOrderInput | SortOrder
    newValues?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ActivityLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActivityLogWhereInput | ActivityLogWhereInput[]
    OR?: ActivityLogWhereInput[]
    NOT?: ActivityLogWhereInput | ActivityLogWhereInput[]
    userId?: UuidNullableFilter<"ActivityLog"> | string | null
    action?: EnumActivityActionFilter<"ActivityLog"> | $Enums.ActivityAction
    entityType?: StringFilter<"ActivityLog"> | string
    entityId?: UuidNullableFilter<"ActivityLog"> | string | null
    oldValues?: JsonNullableFilter<"ActivityLog">
    newValues?: JsonNullableFilter<"ActivityLog">
    ipAddress?: StringNullableFilter<"ActivityLog"> | string | null
    userAgent?: StringNullableFilter<"ActivityLog"> | string | null
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type ActivityLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrderInput | SortOrder
    oldValues?: SortOrderInput | SortOrder
    newValues?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ActivityLogCountOrderByAggregateInput
    _max?: ActivityLogMaxOrderByAggregateInput
    _min?: ActivityLogMinOrderByAggregateInput
  }

  export type ActivityLogScalarWhereWithAggregatesInput = {
    AND?: ActivityLogScalarWhereWithAggregatesInput | ActivityLogScalarWhereWithAggregatesInput[]
    OR?: ActivityLogScalarWhereWithAggregatesInput[]
    NOT?: ActivityLogScalarWhereWithAggregatesInput | ActivityLogScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ActivityLog"> | string
    userId?: UuidNullableWithAggregatesFilter<"ActivityLog"> | string | null
    action?: EnumActivityActionWithAggregatesFilter<"ActivityLog"> | $Enums.ActivityAction
    entityType?: StringWithAggregatesFilter<"ActivityLog"> | string
    entityId?: UuidNullableWithAggregatesFilter<"ActivityLog"> | string | null
    oldValues?: JsonNullableWithAggregatesFilter<"ActivityLog">
    newValues?: JsonNullableWithAggregatesFilter<"ActivityLog">
    ipAddress?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ActivityLog"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    tel?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    emailVerified?: boolean
    mustChangePassword?: boolean
    emailVerificationToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogCreateNestedManyWithoutUserInput
    createdTravelAgencies?: TravelAgencyCreateNestedManyWithoutCreatedByInput
    updatedTravelAgencies?: TravelAgencyCreateNestedManyWithoutUpdatedByInput
    createdCarBookings?: CarBookingCreateNestedManyWithoutCreatedByInput
    updatedCarBookings?: CarBookingCreateNestedManyWithoutUpdatedByInput
    createdPaymentRecords?: PaymentRecordCreateNestedManyWithoutCreatedByInput
    createdExpenses?: ExpenseCreateNestedManyWithoutCreatedByInput
    updatedExpenses?: ExpenseCreateNestedManyWithoutUpdatedByInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    tel?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    emailVerified?: boolean
    mustChangePassword?: boolean
    emailVerificationToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
    createdTravelAgencies?: TravelAgencyUncheckedCreateNestedManyWithoutCreatedByInput
    updatedTravelAgencies?: TravelAgencyUncheckedCreateNestedManyWithoutUpdatedByInput
    createdCarBookings?: CarBookingUncheckedCreateNestedManyWithoutCreatedByInput
    updatedCarBookings?: CarBookingUncheckedCreateNestedManyWithoutUpdatedByInput
    createdPaymentRecords?: PaymentRecordUncheckedCreateNestedManyWithoutCreatedByInput
    createdExpenses?: ExpenseUncheckedCreateNestedManyWithoutCreatedByInput
    updatedExpenses?: ExpenseUncheckedCreateNestedManyWithoutUpdatedByInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutUserNestedInput
    createdTravelAgencies?: TravelAgencyUpdateManyWithoutCreatedByNestedInput
    updatedTravelAgencies?: TravelAgencyUpdateManyWithoutUpdatedByNestedInput
    createdCarBookings?: CarBookingUpdateManyWithoutCreatedByNestedInput
    updatedCarBookings?: CarBookingUpdateManyWithoutUpdatedByNestedInput
    createdPaymentRecords?: PaymentRecordUpdateManyWithoutCreatedByNestedInput
    createdExpenses?: ExpenseUpdateManyWithoutCreatedByNestedInput
    updatedExpenses?: ExpenseUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
    createdTravelAgencies?: TravelAgencyUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedTravelAgencies?: TravelAgencyUncheckedUpdateManyWithoutUpdatedByNestedInput
    createdCarBookings?: CarBookingUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedCarBookings?: CarBookingUncheckedUpdateManyWithoutUpdatedByNestedInput
    createdPaymentRecords?: PaymentRecordUncheckedUpdateManyWithoutCreatedByNestedInput
    createdExpenses?: ExpenseUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedExpenses?: ExpenseUncheckedUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    tel?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    emailVerified?: boolean
    mustChangePassword?: boolean
    emailVerificationToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RefreshTokenCreateInput = {
    id?: string
    jti: string
    token: string
    deviceInfo?: string | null
    ipAddress?: string | null
    expiresAt: Date | string
    isRevoked?: boolean
    revokedAt?: Date | string | null
    revokedBy?: string | null
    createdAt?: Date | string
    lastUsedAt?: Date | string | null
    user: UserCreateNestedOneWithoutRefreshTokensInput
  }

  export type RefreshTokenUncheckedCreateInput = {
    id?: string
    userId: string
    jti: string
    token: string
    deviceInfo?: string | null
    ipAddress?: string | null
    expiresAt: Date | string
    isRevoked?: boolean
    revokedAt?: Date | string | null
    revokedBy?: string | null
    createdAt?: Date | string
    lastUsedAt?: Date | string | null
  }

  export type RefreshTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jti?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutRefreshTokensNestedInput
  }

  export type RefreshTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    jti?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RefreshTokenCreateManyInput = {
    id?: string
    userId: string
    jti: string
    token: string
    deviceInfo?: string | null
    ipAddress?: string | null
    expiresAt: Date | string
    isRevoked?: boolean
    revokedAt?: Date | string | null
    revokedBy?: string | null
    createdAt?: Date | string
    lastUsedAt?: Date | string | null
  }

  export type RefreshTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    jti?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RefreshTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    jti?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TravelAgencyCreateInput = {
    id?: string
    name: string
    tel?: string | null
    address?: string | null
    note?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedTravelAgenciesInput
    updatedBy?: UserCreateNestedOneWithoutUpdatedTravelAgenciesInput
    carBookings?: CarBookingCreateNestedManyWithoutTravelAgencyInput
    transferredCarBookings?: CarBookingCreateNestedManyWithoutTransferToAgencyInput
  }

  export type TravelAgencyUncheckedCreateInput = {
    id?: string
    name: string
    tel?: string | null
    address?: string | null
    note?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    updatedById?: string | null
    carBookings?: CarBookingUncheckedCreateNestedManyWithoutTravelAgencyInput
    transferredCarBookings?: CarBookingUncheckedCreateNestedManyWithoutTransferToAgencyInput
  }

  export type TravelAgencyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedTravelAgenciesNestedInput
    updatedBy?: UserUpdateOneWithoutUpdatedTravelAgenciesNestedInput
    carBookings?: CarBookingUpdateManyWithoutTravelAgencyNestedInput
    transferredCarBookings?: CarBookingUpdateManyWithoutTransferToAgencyNestedInput
  }

  export type TravelAgencyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    carBookings?: CarBookingUncheckedUpdateManyWithoutTravelAgencyNestedInput
    transferredCarBookings?: CarBookingUncheckedUpdateManyWithoutTransferToAgencyNestedInput
  }

  export type TravelAgencyCreateManyInput = {
    id?: string
    name: string
    tel?: string | null
    address?: string | null
    note?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    updatedById?: string | null
  }

  export type TravelAgencyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TravelAgencyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CarBookingCreateInput = {
    id?: string
    bookingCode: string
    vehicleType: $Enums.TransportType
    serviceDate: Date | string
    guestName: string
    guestPhone?: string | null
    guestCount?: number
    pickupLocation?: string | null
    dropoffLocation?: string | null
    vat?: boolean
    sellingPrice: Decimal | DecimalJsLike | number | string
    receivingPrice: Decimal | DecimalJsLike | number | string
    debtAmount: Decimal | DecimalJsLike | number | string
    paymentCollection: $Enums.PaymentCollection
    paymentCollectionNote?: string | null
    paymentStatus?: $Enums.PaymentStatus
    paidAt?: Date | string | null
    status?: $Enums.CarBookingStatus
    note?: string | null
    routes?: string | null
    isTransfer?: boolean
    transferReason?: string | null
    transferredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    travelAgency?: TravelAgencyCreateNestedOneWithoutCarBookingsInput
    createdBy?: UserCreateNestedOneWithoutCreatedCarBookingsInput
    updatedBy?: UserCreateNestedOneWithoutUpdatedCarBookingsInput
    transferFrom?: CarBookingCreateNestedOneWithoutTransferBookingsInput
    transferBookings?: CarBookingCreateNestedManyWithoutTransferFromInput
    transferToAgency?: TravelAgencyCreateNestedOneWithoutTransferredCarBookingsInput
  }

  export type CarBookingUncheckedCreateInput = {
    id?: string
    bookingCode: string
    travelAgencyId?: string | null
    vehicleType: $Enums.TransportType
    serviceDate: Date | string
    guestName: string
    guestPhone?: string | null
    guestCount?: number
    pickupLocation?: string | null
    dropoffLocation?: string | null
    vat?: boolean
    sellingPrice: Decimal | DecimalJsLike | number | string
    receivingPrice: Decimal | DecimalJsLike | number | string
    debtAmount: Decimal | DecimalJsLike | number | string
    paymentCollection: $Enums.PaymentCollection
    paymentCollectionNote?: string | null
    paymentStatus?: $Enums.PaymentStatus
    paidAt?: Date | string | null
    status?: $Enums.CarBookingStatus
    note?: string | null
    routes?: string | null
    isTransfer?: boolean
    transferFromId?: string | null
    transferToAgencyId?: string | null
    transferReason?: string | null
    transferredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    updatedById?: string | null
    transferBookings?: CarBookingUncheckedCreateNestedManyWithoutTransferFromInput
  }

  export type CarBookingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    vehicleType?: EnumTransportTypeFieldUpdateOperationsInput | $Enums.TransportType
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestCount?: IntFieldUpdateOperationsInput | number
    pickupLocation?: NullableStringFieldUpdateOperationsInput | string | null
    dropoffLocation?: NullableStringFieldUpdateOperationsInput | string | null
    vat?: BoolFieldUpdateOperationsInput | boolean
    sellingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    receivingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentCollection?: EnumPaymentCollectionFieldUpdateOperationsInput | $Enums.PaymentCollection
    paymentCollectionNote?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumCarBookingStatusFieldUpdateOperationsInput | $Enums.CarBookingStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    routes?: NullableStringFieldUpdateOperationsInput | string | null
    isTransfer?: BoolFieldUpdateOperationsInput | boolean
    transferReason?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    travelAgency?: TravelAgencyUpdateOneWithoutCarBookingsNestedInput
    createdBy?: UserUpdateOneWithoutCreatedCarBookingsNestedInput
    updatedBy?: UserUpdateOneWithoutUpdatedCarBookingsNestedInput
    transferFrom?: CarBookingUpdateOneWithoutTransferBookingsNestedInput
    transferBookings?: CarBookingUpdateManyWithoutTransferFromNestedInput
    transferToAgency?: TravelAgencyUpdateOneWithoutTransferredCarBookingsNestedInput
  }

  export type CarBookingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    travelAgencyId?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleType?: EnumTransportTypeFieldUpdateOperationsInput | $Enums.TransportType
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestCount?: IntFieldUpdateOperationsInput | number
    pickupLocation?: NullableStringFieldUpdateOperationsInput | string | null
    dropoffLocation?: NullableStringFieldUpdateOperationsInput | string | null
    vat?: BoolFieldUpdateOperationsInput | boolean
    sellingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    receivingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentCollection?: EnumPaymentCollectionFieldUpdateOperationsInput | $Enums.PaymentCollection
    paymentCollectionNote?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumCarBookingStatusFieldUpdateOperationsInput | $Enums.CarBookingStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    routes?: NullableStringFieldUpdateOperationsInput | string | null
    isTransfer?: BoolFieldUpdateOperationsInput | boolean
    transferFromId?: NullableStringFieldUpdateOperationsInput | string | null
    transferToAgencyId?: NullableStringFieldUpdateOperationsInput | string | null
    transferReason?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    transferBookings?: CarBookingUncheckedUpdateManyWithoutTransferFromNestedInput
  }

  export type CarBookingCreateManyInput = {
    id?: string
    bookingCode: string
    travelAgencyId?: string | null
    vehicleType: $Enums.TransportType
    serviceDate: Date | string
    guestName: string
    guestPhone?: string | null
    guestCount?: number
    pickupLocation?: string | null
    dropoffLocation?: string | null
    vat?: boolean
    sellingPrice: Decimal | DecimalJsLike | number | string
    receivingPrice: Decimal | DecimalJsLike | number | string
    debtAmount: Decimal | DecimalJsLike | number | string
    paymentCollection: $Enums.PaymentCollection
    paymentCollectionNote?: string | null
    paymentStatus?: $Enums.PaymentStatus
    paidAt?: Date | string | null
    status?: $Enums.CarBookingStatus
    note?: string | null
    routes?: string | null
    isTransfer?: boolean
    transferFromId?: string | null
    transferToAgencyId?: string | null
    transferReason?: string | null
    transferredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    updatedById?: string | null
  }

  export type CarBookingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    vehicleType?: EnumTransportTypeFieldUpdateOperationsInput | $Enums.TransportType
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestCount?: IntFieldUpdateOperationsInput | number
    pickupLocation?: NullableStringFieldUpdateOperationsInput | string | null
    dropoffLocation?: NullableStringFieldUpdateOperationsInput | string | null
    vat?: BoolFieldUpdateOperationsInput | boolean
    sellingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    receivingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentCollection?: EnumPaymentCollectionFieldUpdateOperationsInput | $Enums.PaymentCollection
    paymentCollectionNote?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumCarBookingStatusFieldUpdateOperationsInput | $Enums.CarBookingStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    routes?: NullableStringFieldUpdateOperationsInput | string | null
    isTransfer?: BoolFieldUpdateOperationsInput | boolean
    transferReason?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CarBookingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    travelAgencyId?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleType?: EnumTransportTypeFieldUpdateOperationsInput | $Enums.TransportType
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestCount?: IntFieldUpdateOperationsInput | number
    pickupLocation?: NullableStringFieldUpdateOperationsInput | string | null
    dropoffLocation?: NullableStringFieldUpdateOperationsInput | string | null
    vat?: BoolFieldUpdateOperationsInput | boolean
    sellingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    receivingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentCollection?: EnumPaymentCollectionFieldUpdateOperationsInput | $Enums.PaymentCollection
    paymentCollectionNote?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumCarBookingStatusFieldUpdateOperationsInput | $Enums.CarBookingStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    routes?: NullableStringFieldUpdateOperationsInput | string | null
    isTransfer?: BoolFieldUpdateOperationsInput | boolean
    transferFromId?: NullableStringFieldUpdateOperationsInput | string | null
    transferToAgencyId?: NullableStringFieldUpdateOperationsInput | string | null
    transferReason?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaymentRecordCreateInput = {
    id?: string
    partnerType: $Enums.PartnerType
    partnerId: string
    debtRecordId?: string | null
    paymentDirection: $Enums.PaymentDirection
    amount: Decimal | DecimalJsLike | number | string
    paymentDate?: Date | string
    paymentMethod?: string | null
    referenceNumber?: string | null
    note?: string | null
    receiptUrl?: string | null
    createdAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedPaymentRecordsInput
  }

  export type PaymentRecordUncheckedCreateInput = {
    id?: string
    partnerType: $Enums.PartnerType
    partnerId: string
    debtRecordId?: string | null
    paymentDirection: $Enums.PaymentDirection
    amount: Decimal | DecimalJsLike | number | string
    paymentDate?: Date | string
    paymentMethod?: string | null
    referenceNumber?: string | null
    note?: string | null
    receiptUrl?: string | null
    createdAt?: Date | string
    createdById?: string | null
  }

  export type PaymentRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    partnerType?: EnumPartnerTypeFieldUpdateOperationsInput | $Enums.PartnerType
    partnerId?: StringFieldUpdateOperationsInput | string
    debtRecordId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDirection?: EnumPaymentDirectionFieldUpdateOperationsInput | $Enums.PaymentDirection
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    referenceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedPaymentRecordsNestedInput
  }

  export type PaymentRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    partnerType?: EnumPartnerTypeFieldUpdateOperationsInput | $Enums.PartnerType
    partnerId?: StringFieldUpdateOperationsInput | string
    debtRecordId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDirection?: EnumPaymentDirectionFieldUpdateOperationsInput | $Enums.PaymentDirection
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    referenceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaymentRecordCreateManyInput = {
    id?: string
    partnerType: $Enums.PartnerType
    partnerId: string
    debtRecordId?: string | null
    paymentDirection: $Enums.PaymentDirection
    amount: Decimal | DecimalJsLike | number | string
    paymentDate?: Date | string
    paymentMethod?: string | null
    referenceNumber?: string | null
    note?: string | null
    receiptUrl?: string | null
    createdAt?: Date | string
    createdById?: string | null
  }

  export type PaymentRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    partnerType?: EnumPartnerTypeFieldUpdateOperationsInput | $Enums.PartnerType
    partnerId?: StringFieldUpdateOperationsInput | string
    debtRecordId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDirection?: EnumPaymentDirectionFieldUpdateOperationsInput | $Enums.PaymentDirection
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    referenceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    partnerType?: EnumPartnerTypeFieldUpdateOperationsInput | $Enums.PartnerType
    partnerId?: StringFieldUpdateOperationsInput | string
    debtRecordId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDirection?: EnumPaymentDirectionFieldUpdateOperationsInput | $Enums.PaymentDirection
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    referenceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExpenseCreateInput = {
    id?: string
    title: string
    amount: Decimal | DecimalJsLike | number | string
    category: $Enums.ExpenseCategory
    month: number
    year: number
    note?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedExpensesInput
    updatedBy?: UserCreateNestedOneWithoutUpdatedExpensesInput
  }

  export type ExpenseUncheckedCreateInput = {
    id?: string
    title: string
    amount: Decimal | DecimalJsLike | number | string
    category: $Enums.ExpenseCategory
    month: number
    year: number
    note?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    updatedById?: string | null
  }

  export type ExpenseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    category?: EnumExpenseCategoryFieldUpdateOperationsInput | $Enums.ExpenseCategory
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedExpensesNestedInput
    updatedBy?: UserUpdateOneWithoutUpdatedExpensesNestedInput
  }

  export type ExpenseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    category?: EnumExpenseCategoryFieldUpdateOperationsInput | $Enums.ExpenseCategory
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExpenseCreateManyInput = {
    id?: string
    title: string
    amount: Decimal | DecimalJsLike | number | string
    category: $Enums.ExpenseCategory
    month: number
    year: number
    note?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    updatedById?: string | null
  }

  export type ExpenseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    category?: EnumExpenseCategoryFieldUpdateOperationsInput | $Enums.ExpenseCategory
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    category?: EnumExpenseCategoryFieldUpdateOperationsInput | $Enums.ExpenseCategory
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivityLogCreateInput = {
    id?: string
    action: $Enums.ActivityAction
    entityType: string
    entityId?: string | null
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutActivityLogsInput
  }

  export type ActivityLogUncheckedCreateInput = {
    id?: string
    userId?: string | null
    action: $Enums.ActivityAction
    entityType: string
    entityId?: string | null
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type ActivityLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumActivityActionFieldUpdateOperationsInput | $Enums.ActivityAction
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutActivityLogsNestedInput
  }

  export type ActivityLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: EnumActivityActionFieldUpdateOperationsInput | $Enums.ActivityAction
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogCreateManyInput = {
    id?: string
    userId?: string | null
    action: $Enums.ActivityAction
    entityType: string
    entityId?: string | null
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type ActivityLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumActivityActionFieldUpdateOperationsInput | $Enums.ActivityAction
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: EnumActivityActionFieldUpdateOperationsInput | $Enums.ActivityAction
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type RefreshTokenListRelationFilter = {
    every?: RefreshTokenWhereInput
    some?: RefreshTokenWhereInput
    none?: RefreshTokenWhereInput
  }

  export type ActivityLogListRelationFilter = {
    every?: ActivityLogWhereInput
    some?: ActivityLogWhereInput
    none?: ActivityLogWhereInput
  }

  export type TravelAgencyListRelationFilter = {
    every?: TravelAgencyWhereInput
    some?: TravelAgencyWhereInput
    none?: TravelAgencyWhereInput
  }

  export type CarBookingListRelationFilter = {
    every?: CarBookingWhereInput
    some?: CarBookingWhereInput
    none?: CarBookingWhereInput
  }

  export type PaymentRecordListRelationFilter = {
    every?: PaymentRecordWhereInput
    some?: PaymentRecordWhereInput
    none?: PaymentRecordWhereInput
  }

  export type ExpenseListRelationFilter = {
    every?: ExpenseWhereInput
    some?: ExpenseWhereInput
    none?: ExpenseWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RefreshTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActivityLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TravelAgencyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CarBookingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExpenseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    tel?: SortOrder
    avatarUrl?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    emailVerified?: SortOrder
    mustChangePassword?: SortOrder
    emailVerificationToken?: SortOrder
    passwordResetToken?: SortOrder
    passwordResetExpires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLogin?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    tel?: SortOrder
    avatarUrl?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    emailVerified?: SortOrder
    mustChangePassword?: SortOrder
    emailVerificationToken?: SortOrder
    passwordResetToken?: SortOrder
    passwordResetExpires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLogin?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    tel?: SortOrder
    avatarUrl?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    emailVerified?: SortOrder
    mustChangePassword?: SortOrder
    emailVerificationToken?: SortOrder
    passwordResetToken?: SortOrder
    passwordResetExpires?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLogin?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type RefreshTokenCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    jti?: SortOrder
    token?: SortOrder
    deviceInfo?: SortOrder
    ipAddress?: SortOrder
    expiresAt?: SortOrder
    isRevoked?: SortOrder
    revokedAt?: SortOrder
    revokedBy?: SortOrder
    createdAt?: SortOrder
    lastUsedAt?: SortOrder
  }

  export type RefreshTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    jti?: SortOrder
    token?: SortOrder
    deviceInfo?: SortOrder
    ipAddress?: SortOrder
    expiresAt?: SortOrder
    isRevoked?: SortOrder
    revokedAt?: SortOrder
    revokedBy?: SortOrder
    createdAt?: SortOrder
    lastUsedAt?: SortOrder
  }

  export type RefreshTokenMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    jti?: SortOrder
    token?: SortOrder
    deviceInfo?: SortOrder
    ipAddress?: SortOrder
    expiresAt?: SortOrder
    isRevoked?: SortOrder
    revokedAt?: SortOrder
    revokedBy?: SortOrder
    createdAt?: SortOrder
    lastUsedAt?: SortOrder
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type TravelAgencyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    tel?: SortOrder
    address?: SortOrder
    note?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
    updatedById?: SortOrder
  }

  export type TravelAgencyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    tel?: SortOrder
    address?: SortOrder
    note?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
    updatedById?: SortOrder
  }

  export type TravelAgencyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    tel?: SortOrder
    address?: SortOrder
    note?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
    updatedById?: SortOrder
  }

  export type EnumTransportTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransportType | EnumTransportTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransportType[] | ListEnumTransportTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransportType[] | ListEnumTransportTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransportTypeFilter<$PrismaModel> | $Enums.TransportType
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type EnumPaymentCollectionFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentCollection | EnumPaymentCollectionFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentCollection[] | ListEnumPaymentCollectionFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentCollection[] | ListEnumPaymentCollectionFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentCollectionFilter<$PrismaModel> | $Enums.PaymentCollection
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type EnumCarBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CarBookingStatus | EnumCarBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CarBookingStatus[] | ListEnumCarBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CarBookingStatus[] | ListEnumCarBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCarBookingStatusFilter<$PrismaModel> | $Enums.CarBookingStatus
  }

  export type TravelAgencyNullableScalarRelationFilter = {
    is?: TravelAgencyWhereInput | null
    isNot?: TravelAgencyWhereInput | null
  }

  export type CarBookingNullableScalarRelationFilter = {
    is?: CarBookingWhereInput | null
    isNot?: CarBookingWhereInput | null
  }

  export type CarBookingCountOrderByAggregateInput = {
    id?: SortOrder
    bookingCode?: SortOrder
    travelAgencyId?: SortOrder
    vehicleType?: SortOrder
    serviceDate?: SortOrder
    guestName?: SortOrder
    guestPhone?: SortOrder
    guestCount?: SortOrder
    pickupLocation?: SortOrder
    dropoffLocation?: SortOrder
    vat?: SortOrder
    sellingPrice?: SortOrder
    receivingPrice?: SortOrder
    debtAmount?: SortOrder
    paymentCollection?: SortOrder
    paymentCollectionNote?: SortOrder
    paymentStatus?: SortOrder
    paidAt?: SortOrder
    status?: SortOrder
    note?: SortOrder
    routes?: SortOrder
    isTransfer?: SortOrder
    transferFromId?: SortOrder
    transferToAgencyId?: SortOrder
    transferReason?: SortOrder
    transferredAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
    updatedById?: SortOrder
  }

  export type CarBookingAvgOrderByAggregateInput = {
    guestCount?: SortOrder
    sellingPrice?: SortOrder
    receivingPrice?: SortOrder
    debtAmount?: SortOrder
  }

  export type CarBookingMaxOrderByAggregateInput = {
    id?: SortOrder
    bookingCode?: SortOrder
    travelAgencyId?: SortOrder
    vehicleType?: SortOrder
    serviceDate?: SortOrder
    guestName?: SortOrder
    guestPhone?: SortOrder
    guestCount?: SortOrder
    pickupLocation?: SortOrder
    dropoffLocation?: SortOrder
    vat?: SortOrder
    sellingPrice?: SortOrder
    receivingPrice?: SortOrder
    debtAmount?: SortOrder
    paymentCollection?: SortOrder
    paymentCollectionNote?: SortOrder
    paymentStatus?: SortOrder
    paidAt?: SortOrder
    status?: SortOrder
    note?: SortOrder
    routes?: SortOrder
    isTransfer?: SortOrder
    transferFromId?: SortOrder
    transferToAgencyId?: SortOrder
    transferReason?: SortOrder
    transferredAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
    updatedById?: SortOrder
  }

  export type CarBookingMinOrderByAggregateInput = {
    id?: SortOrder
    bookingCode?: SortOrder
    travelAgencyId?: SortOrder
    vehicleType?: SortOrder
    serviceDate?: SortOrder
    guestName?: SortOrder
    guestPhone?: SortOrder
    guestCount?: SortOrder
    pickupLocation?: SortOrder
    dropoffLocation?: SortOrder
    vat?: SortOrder
    sellingPrice?: SortOrder
    receivingPrice?: SortOrder
    debtAmount?: SortOrder
    paymentCollection?: SortOrder
    paymentCollectionNote?: SortOrder
    paymentStatus?: SortOrder
    paidAt?: SortOrder
    status?: SortOrder
    note?: SortOrder
    routes?: SortOrder
    isTransfer?: SortOrder
    transferFromId?: SortOrder
    transferToAgencyId?: SortOrder
    transferReason?: SortOrder
    transferredAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
    updatedById?: SortOrder
  }

  export type CarBookingSumOrderByAggregateInput = {
    guestCount?: SortOrder
    sellingPrice?: SortOrder
    receivingPrice?: SortOrder
    debtAmount?: SortOrder
  }

  export type EnumTransportTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransportType | EnumTransportTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransportType[] | ListEnumTransportTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransportType[] | ListEnumTransportTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransportTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransportType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransportTypeFilter<$PrismaModel>
    _max?: NestedEnumTransportTypeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumPaymentCollectionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentCollection | EnumPaymentCollectionFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentCollection[] | ListEnumPaymentCollectionFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentCollection[] | ListEnumPaymentCollectionFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentCollectionWithAggregatesFilter<$PrismaModel> | $Enums.PaymentCollection
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentCollectionFilter<$PrismaModel>
    _max?: NestedEnumPaymentCollectionFilter<$PrismaModel>
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type EnumCarBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CarBookingStatus | EnumCarBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CarBookingStatus[] | ListEnumCarBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CarBookingStatus[] | ListEnumCarBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCarBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.CarBookingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCarBookingStatusFilter<$PrismaModel>
    _max?: NestedEnumCarBookingStatusFilter<$PrismaModel>
  }

  export type EnumPartnerTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PartnerType | EnumPartnerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PartnerType[] | ListEnumPartnerTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PartnerType[] | ListEnumPartnerTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPartnerTypeFilter<$PrismaModel> | $Enums.PartnerType
  }

  export type EnumPaymentDirectionFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentDirection | EnumPaymentDirectionFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentDirection[] | ListEnumPaymentDirectionFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentDirection[] | ListEnumPaymentDirectionFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentDirectionFilter<$PrismaModel> | $Enums.PaymentDirection
  }

  export type PaymentRecordCountOrderByAggregateInput = {
    id?: SortOrder
    partnerType?: SortOrder
    partnerId?: SortOrder
    debtRecordId?: SortOrder
    paymentDirection?: SortOrder
    amount?: SortOrder
    paymentDate?: SortOrder
    paymentMethod?: SortOrder
    referenceNumber?: SortOrder
    note?: SortOrder
    receiptUrl?: SortOrder
    createdAt?: SortOrder
    createdById?: SortOrder
  }

  export type PaymentRecordAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type PaymentRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    partnerType?: SortOrder
    partnerId?: SortOrder
    debtRecordId?: SortOrder
    paymentDirection?: SortOrder
    amount?: SortOrder
    paymentDate?: SortOrder
    paymentMethod?: SortOrder
    referenceNumber?: SortOrder
    note?: SortOrder
    receiptUrl?: SortOrder
    createdAt?: SortOrder
    createdById?: SortOrder
  }

  export type PaymentRecordMinOrderByAggregateInput = {
    id?: SortOrder
    partnerType?: SortOrder
    partnerId?: SortOrder
    debtRecordId?: SortOrder
    paymentDirection?: SortOrder
    amount?: SortOrder
    paymentDate?: SortOrder
    paymentMethod?: SortOrder
    referenceNumber?: SortOrder
    note?: SortOrder
    receiptUrl?: SortOrder
    createdAt?: SortOrder
    createdById?: SortOrder
  }

  export type PaymentRecordSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumPartnerTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PartnerType | EnumPartnerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PartnerType[] | ListEnumPartnerTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PartnerType[] | ListEnumPartnerTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPartnerTypeWithAggregatesFilter<$PrismaModel> | $Enums.PartnerType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPartnerTypeFilter<$PrismaModel>
    _max?: NestedEnumPartnerTypeFilter<$PrismaModel>
  }

  export type EnumPaymentDirectionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentDirection | EnumPaymentDirectionFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentDirection[] | ListEnumPaymentDirectionFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentDirection[] | ListEnumPaymentDirectionFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentDirectionWithAggregatesFilter<$PrismaModel> | $Enums.PaymentDirection
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentDirectionFilter<$PrismaModel>
    _max?: NestedEnumPaymentDirectionFilter<$PrismaModel>
  }

  export type EnumExpenseCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.ExpenseCategory | EnumExpenseCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ExpenseCategory[] | ListEnumExpenseCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExpenseCategory[] | ListEnumExpenseCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumExpenseCategoryFilter<$PrismaModel> | $Enums.ExpenseCategory
  }

  export type ExpenseCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    amount?: SortOrder
    category?: SortOrder
    month?: SortOrder
    year?: SortOrder
    note?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
    updatedById?: SortOrder
  }

  export type ExpenseAvgOrderByAggregateInput = {
    amount?: SortOrder
    month?: SortOrder
    year?: SortOrder
  }

  export type ExpenseMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    amount?: SortOrder
    category?: SortOrder
    month?: SortOrder
    year?: SortOrder
    note?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
    updatedById?: SortOrder
  }

  export type ExpenseMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    amount?: SortOrder
    category?: SortOrder
    month?: SortOrder
    year?: SortOrder
    note?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdById?: SortOrder
    updatedById?: SortOrder
  }

  export type ExpenseSumOrderByAggregateInput = {
    amount?: SortOrder
    month?: SortOrder
    year?: SortOrder
  }

  export type EnumExpenseCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExpenseCategory | EnumExpenseCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ExpenseCategory[] | ListEnumExpenseCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExpenseCategory[] | ListEnumExpenseCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumExpenseCategoryWithAggregatesFilter<$PrismaModel> | $Enums.ExpenseCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExpenseCategoryFilter<$PrismaModel>
    _max?: NestedEnumExpenseCategoryFilter<$PrismaModel>
  }

  export type EnumActivityActionFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivityAction | EnumActivityActionFieldRefInput<$PrismaModel>
    in?: $Enums.ActivityAction[] | ListEnumActivityActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.ActivityAction[] | ListEnumActivityActionFieldRefInput<$PrismaModel>
    not?: NestedEnumActivityActionFilter<$PrismaModel> | $Enums.ActivityAction
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ActivityLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    oldValues?: SortOrder
    newValues?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumActivityActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivityAction | EnumActivityActionFieldRefInput<$PrismaModel>
    in?: $Enums.ActivityAction[] | ListEnumActivityActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.ActivityAction[] | ListEnumActivityActionFieldRefInput<$PrismaModel>
    not?: NestedEnumActivityActionWithAggregatesFilter<$PrismaModel> | $Enums.ActivityAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumActivityActionFilter<$PrismaModel>
    _max?: NestedEnumActivityActionFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type RefreshTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type ActivityLogCreateNestedManyWithoutUserInput = {
    create?: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput> | ActivityLogCreateWithoutUserInput[] | ActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutUserInput | ActivityLogCreateOrConnectWithoutUserInput[]
    createMany?: ActivityLogCreateManyUserInputEnvelope
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
  }

  export type TravelAgencyCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<TravelAgencyCreateWithoutCreatedByInput, TravelAgencyUncheckedCreateWithoutCreatedByInput> | TravelAgencyCreateWithoutCreatedByInput[] | TravelAgencyUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TravelAgencyCreateOrConnectWithoutCreatedByInput | TravelAgencyCreateOrConnectWithoutCreatedByInput[]
    createMany?: TravelAgencyCreateManyCreatedByInputEnvelope
    connect?: TravelAgencyWhereUniqueInput | TravelAgencyWhereUniqueInput[]
  }

  export type TravelAgencyCreateNestedManyWithoutUpdatedByInput = {
    create?: XOR<TravelAgencyCreateWithoutUpdatedByInput, TravelAgencyUncheckedCreateWithoutUpdatedByInput> | TravelAgencyCreateWithoutUpdatedByInput[] | TravelAgencyUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: TravelAgencyCreateOrConnectWithoutUpdatedByInput | TravelAgencyCreateOrConnectWithoutUpdatedByInput[]
    createMany?: TravelAgencyCreateManyUpdatedByInputEnvelope
    connect?: TravelAgencyWhereUniqueInput | TravelAgencyWhereUniqueInput[]
  }

  export type CarBookingCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<CarBookingCreateWithoutCreatedByInput, CarBookingUncheckedCreateWithoutCreatedByInput> | CarBookingCreateWithoutCreatedByInput[] | CarBookingUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CarBookingCreateOrConnectWithoutCreatedByInput | CarBookingCreateOrConnectWithoutCreatedByInput[]
    createMany?: CarBookingCreateManyCreatedByInputEnvelope
    connect?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
  }

  export type CarBookingCreateNestedManyWithoutUpdatedByInput = {
    create?: XOR<CarBookingCreateWithoutUpdatedByInput, CarBookingUncheckedCreateWithoutUpdatedByInput> | CarBookingCreateWithoutUpdatedByInput[] | CarBookingUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: CarBookingCreateOrConnectWithoutUpdatedByInput | CarBookingCreateOrConnectWithoutUpdatedByInput[]
    createMany?: CarBookingCreateManyUpdatedByInputEnvelope
    connect?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
  }

  export type PaymentRecordCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<PaymentRecordCreateWithoutCreatedByInput, PaymentRecordUncheckedCreateWithoutCreatedByInput> | PaymentRecordCreateWithoutCreatedByInput[] | PaymentRecordUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: PaymentRecordCreateOrConnectWithoutCreatedByInput | PaymentRecordCreateOrConnectWithoutCreatedByInput[]
    createMany?: PaymentRecordCreateManyCreatedByInputEnvelope
    connect?: PaymentRecordWhereUniqueInput | PaymentRecordWhereUniqueInput[]
  }

  export type ExpenseCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<ExpenseCreateWithoutCreatedByInput, ExpenseUncheckedCreateWithoutCreatedByInput> | ExpenseCreateWithoutCreatedByInput[] | ExpenseUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutCreatedByInput | ExpenseCreateOrConnectWithoutCreatedByInput[]
    createMany?: ExpenseCreateManyCreatedByInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type ExpenseCreateNestedManyWithoutUpdatedByInput = {
    create?: XOR<ExpenseCreateWithoutUpdatedByInput, ExpenseUncheckedCreateWithoutUpdatedByInput> | ExpenseCreateWithoutUpdatedByInput[] | ExpenseUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutUpdatedByInput | ExpenseCreateOrConnectWithoutUpdatedByInput[]
    createMany?: ExpenseCreateManyUpdatedByInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type RefreshTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type ActivityLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput> | ActivityLogCreateWithoutUserInput[] | ActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutUserInput | ActivityLogCreateOrConnectWithoutUserInput[]
    createMany?: ActivityLogCreateManyUserInputEnvelope
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
  }

  export type TravelAgencyUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<TravelAgencyCreateWithoutCreatedByInput, TravelAgencyUncheckedCreateWithoutCreatedByInput> | TravelAgencyCreateWithoutCreatedByInput[] | TravelAgencyUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TravelAgencyCreateOrConnectWithoutCreatedByInput | TravelAgencyCreateOrConnectWithoutCreatedByInput[]
    createMany?: TravelAgencyCreateManyCreatedByInputEnvelope
    connect?: TravelAgencyWhereUniqueInput | TravelAgencyWhereUniqueInput[]
  }

  export type TravelAgencyUncheckedCreateNestedManyWithoutUpdatedByInput = {
    create?: XOR<TravelAgencyCreateWithoutUpdatedByInput, TravelAgencyUncheckedCreateWithoutUpdatedByInput> | TravelAgencyCreateWithoutUpdatedByInput[] | TravelAgencyUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: TravelAgencyCreateOrConnectWithoutUpdatedByInput | TravelAgencyCreateOrConnectWithoutUpdatedByInput[]
    createMany?: TravelAgencyCreateManyUpdatedByInputEnvelope
    connect?: TravelAgencyWhereUniqueInput | TravelAgencyWhereUniqueInput[]
  }

  export type CarBookingUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<CarBookingCreateWithoutCreatedByInput, CarBookingUncheckedCreateWithoutCreatedByInput> | CarBookingCreateWithoutCreatedByInput[] | CarBookingUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CarBookingCreateOrConnectWithoutCreatedByInput | CarBookingCreateOrConnectWithoutCreatedByInput[]
    createMany?: CarBookingCreateManyCreatedByInputEnvelope
    connect?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
  }

  export type CarBookingUncheckedCreateNestedManyWithoutUpdatedByInput = {
    create?: XOR<CarBookingCreateWithoutUpdatedByInput, CarBookingUncheckedCreateWithoutUpdatedByInput> | CarBookingCreateWithoutUpdatedByInput[] | CarBookingUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: CarBookingCreateOrConnectWithoutUpdatedByInput | CarBookingCreateOrConnectWithoutUpdatedByInput[]
    createMany?: CarBookingCreateManyUpdatedByInputEnvelope
    connect?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
  }

  export type PaymentRecordUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<PaymentRecordCreateWithoutCreatedByInput, PaymentRecordUncheckedCreateWithoutCreatedByInput> | PaymentRecordCreateWithoutCreatedByInput[] | PaymentRecordUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: PaymentRecordCreateOrConnectWithoutCreatedByInput | PaymentRecordCreateOrConnectWithoutCreatedByInput[]
    createMany?: PaymentRecordCreateManyCreatedByInputEnvelope
    connect?: PaymentRecordWhereUniqueInput | PaymentRecordWhereUniqueInput[]
  }

  export type ExpenseUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<ExpenseCreateWithoutCreatedByInput, ExpenseUncheckedCreateWithoutCreatedByInput> | ExpenseCreateWithoutCreatedByInput[] | ExpenseUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutCreatedByInput | ExpenseCreateOrConnectWithoutCreatedByInput[]
    createMany?: ExpenseCreateManyCreatedByInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type ExpenseUncheckedCreateNestedManyWithoutUpdatedByInput = {
    create?: XOR<ExpenseCreateWithoutUpdatedByInput, ExpenseUncheckedCreateWithoutUpdatedByInput> | ExpenseCreateWithoutUpdatedByInput[] | ExpenseUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutUpdatedByInput | ExpenseCreateOrConnectWithoutUpdatedByInput[]
    createMany?: ExpenseCreateManyUpdatedByInputEnvelope
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type RefreshTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type ActivityLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput> | ActivityLogCreateWithoutUserInput[] | ActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutUserInput | ActivityLogCreateOrConnectWithoutUserInput[]
    upsert?: ActivityLogUpsertWithWhereUniqueWithoutUserInput | ActivityLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivityLogCreateManyUserInputEnvelope
    set?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    disconnect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    delete?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    update?: ActivityLogUpdateWithWhereUniqueWithoutUserInput | ActivityLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActivityLogUpdateManyWithWhereWithoutUserInput | ActivityLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
  }

  export type TravelAgencyUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<TravelAgencyCreateWithoutCreatedByInput, TravelAgencyUncheckedCreateWithoutCreatedByInput> | TravelAgencyCreateWithoutCreatedByInput[] | TravelAgencyUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TravelAgencyCreateOrConnectWithoutCreatedByInput | TravelAgencyCreateOrConnectWithoutCreatedByInput[]
    upsert?: TravelAgencyUpsertWithWhereUniqueWithoutCreatedByInput | TravelAgencyUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: TravelAgencyCreateManyCreatedByInputEnvelope
    set?: TravelAgencyWhereUniqueInput | TravelAgencyWhereUniqueInput[]
    disconnect?: TravelAgencyWhereUniqueInput | TravelAgencyWhereUniqueInput[]
    delete?: TravelAgencyWhereUniqueInput | TravelAgencyWhereUniqueInput[]
    connect?: TravelAgencyWhereUniqueInput | TravelAgencyWhereUniqueInput[]
    update?: TravelAgencyUpdateWithWhereUniqueWithoutCreatedByInput | TravelAgencyUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: TravelAgencyUpdateManyWithWhereWithoutCreatedByInput | TravelAgencyUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: TravelAgencyScalarWhereInput | TravelAgencyScalarWhereInput[]
  }

  export type TravelAgencyUpdateManyWithoutUpdatedByNestedInput = {
    create?: XOR<TravelAgencyCreateWithoutUpdatedByInput, TravelAgencyUncheckedCreateWithoutUpdatedByInput> | TravelAgencyCreateWithoutUpdatedByInput[] | TravelAgencyUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: TravelAgencyCreateOrConnectWithoutUpdatedByInput | TravelAgencyCreateOrConnectWithoutUpdatedByInput[]
    upsert?: TravelAgencyUpsertWithWhereUniqueWithoutUpdatedByInput | TravelAgencyUpsertWithWhereUniqueWithoutUpdatedByInput[]
    createMany?: TravelAgencyCreateManyUpdatedByInputEnvelope
    set?: TravelAgencyWhereUniqueInput | TravelAgencyWhereUniqueInput[]
    disconnect?: TravelAgencyWhereUniqueInput | TravelAgencyWhereUniqueInput[]
    delete?: TravelAgencyWhereUniqueInput | TravelAgencyWhereUniqueInput[]
    connect?: TravelAgencyWhereUniqueInput | TravelAgencyWhereUniqueInput[]
    update?: TravelAgencyUpdateWithWhereUniqueWithoutUpdatedByInput | TravelAgencyUpdateWithWhereUniqueWithoutUpdatedByInput[]
    updateMany?: TravelAgencyUpdateManyWithWhereWithoutUpdatedByInput | TravelAgencyUpdateManyWithWhereWithoutUpdatedByInput[]
    deleteMany?: TravelAgencyScalarWhereInput | TravelAgencyScalarWhereInput[]
  }

  export type CarBookingUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<CarBookingCreateWithoutCreatedByInput, CarBookingUncheckedCreateWithoutCreatedByInput> | CarBookingCreateWithoutCreatedByInput[] | CarBookingUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CarBookingCreateOrConnectWithoutCreatedByInput | CarBookingCreateOrConnectWithoutCreatedByInput[]
    upsert?: CarBookingUpsertWithWhereUniqueWithoutCreatedByInput | CarBookingUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: CarBookingCreateManyCreatedByInputEnvelope
    set?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    disconnect?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    delete?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    connect?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    update?: CarBookingUpdateWithWhereUniqueWithoutCreatedByInput | CarBookingUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: CarBookingUpdateManyWithWhereWithoutCreatedByInput | CarBookingUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: CarBookingScalarWhereInput | CarBookingScalarWhereInput[]
  }

  export type CarBookingUpdateManyWithoutUpdatedByNestedInput = {
    create?: XOR<CarBookingCreateWithoutUpdatedByInput, CarBookingUncheckedCreateWithoutUpdatedByInput> | CarBookingCreateWithoutUpdatedByInput[] | CarBookingUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: CarBookingCreateOrConnectWithoutUpdatedByInput | CarBookingCreateOrConnectWithoutUpdatedByInput[]
    upsert?: CarBookingUpsertWithWhereUniqueWithoutUpdatedByInput | CarBookingUpsertWithWhereUniqueWithoutUpdatedByInput[]
    createMany?: CarBookingCreateManyUpdatedByInputEnvelope
    set?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    disconnect?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    delete?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    connect?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    update?: CarBookingUpdateWithWhereUniqueWithoutUpdatedByInput | CarBookingUpdateWithWhereUniqueWithoutUpdatedByInput[]
    updateMany?: CarBookingUpdateManyWithWhereWithoutUpdatedByInput | CarBookingUpdateManyWithWhereWithoutUpdatedByInput[]
    deleteMany?: CarBookingScalarWhereInput | CarBookingScalarWhereInput[]
  }

  export type PaymentRecordUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<PaymentRecordCreateWithoutCreatedByInput, PaymentRecordUncheckedCreateWithoutCreatedByInput> | PaymentRecordCreateWithoutCreatedByInput[] | PaymentRecordUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: PaymentRecordCreateOrConnectWithoutCreatedByInput | PaymentRecordCreateOrConnectWithoutCreatedByInput[]
    upsert?: PaymentRecordUpsertWithWhereUniqueWithoutCreatedByInput | PaymentRecordUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: PaymentRecordCreateManyCreatedByInputEnvelope
    set?: PaymentRecordWhereUniqueInput | PaymentRecordWhereUniqueInput[]
    disconnect?: PaymentRecordWhereUniqueInput | PaymentRecordWhereUniqueInput[]
    delete?: PaymentRecordWhereUniqueInput | PaymentRecordWhereUniqueInput[]
    connect?: PaymentRecordWhereUniqueInput | PaymentRecordWhereUniqueInput[]
    update?: PaymentRecordUpdateWithWhereUniqueWithoutCreatedByInput | PaymentRecordUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: PaymentRecordUpdateManyWithWhereWithoutCreatedByInput | PaymentRecordUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: PaymentRecordScalarWhereInput | PaymentRecordScalarWhereInput[]
  }

  export type ExpenseUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<ExpenseCreateWithoutCreatedByInput, ExpenseUncheckedCreateWithoutCreatedByInput> | ExpenseCreateWithoutCreatedByInput[] | ExpenseUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutCreatedByInput | ExpenseCreateOrConnectWithoutCreatedByInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutCreatedByInput | ExpenseUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: ExpenseCreateManyCreatedByInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutCreatedByInput | ExpenseUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutCreatedByInput | ExpenseUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type ExpenseUpdateManyWithoutUpdatedByNestedInput = {
    create?: XOR<ExpenseCreateWithoutUpdatedByInput, ExpenseUncheckedCreateWithoutUpdatedByInput> | ExpenseCreateWithoutUpdatedByInput[] | ExpenseUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutUpdatedByInput | ExpenseCreateOrConnectWithoutUpdatedByInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutUpdatedByInput | ExpenseUpsertWithWhereUniqueWithoutUpdatedByInput[]
    createMany?: ExpenseCreateManyUpdatedByInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutUpdatedByInput | ExpenseUpdateWithWhereUniqueWithoutUpdatedByInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutUpdatedByInput | ExpenseUpdateManyWithWhereWithoutUpdatedByInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type ActivityLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput> | ActivityLogCreateWithoutUserInput[] | ActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutUserInput | ActivityLogCreateOrConnectWithoutUserInput[]
    upsert?: ActivityLogUpsertWithWhereUniqueWithoutUserInput | ActivityLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivityLogCreateManyUserInputEnvelope
    set?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    disconnect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    delete?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    update?: ActivityLogUpdateWithWhereUniqueWithoutUserInput | ActivityLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActivityLogUpdateManyWithWhereWithoutUserInput | ActivityLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
  }

  export type TravelAgencyUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<TravelAgencyCreateWithoutCreatedByInput, TravelAgencyUncheckedCreateWithoutCreatedByInput> | TravelAgencyCreateWithoutCreatedByInput[] | TravelAgencyUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TravelAgencyCreateOrConnectWithoutCreatedByInput | TravelAgencyCreateOrConnectWithoutCreatedByInput[]
    upsert?: TravelAgencyUpsertWithWhereUniqueWithoutCreatedByInput | TravelAgencyUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: TravelAgencyCreateManyCreatedByInputEnvelope
    set?: TravelAgencyWhereUniqueInput | TravelAgencyWhereUniqueInput[]
    disconnect?: TravelAgencyWhereUniqueInput | TravelAgencyWhereUniqueInput[]
    delete?: TravelAgencyWhereUniqueInput | TravelAgencyWhereUniqueInput[]
    connect?: TravelAgencyWhereUniqueInput | TravelAgencyWhereUniqueInput[]
    update?: TravelAgencyUpdateWithWhereUniqueWithoutCreatedByInput | TravelAgencyUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: TravelAgencyUpdateManyWithWhereWithoutCreatedByInput | TravelAgencyUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: TravelAgencyScalarWhereInput | TravelAgencyScalarWhereInput[]
  }

  export type TravelAgencyUncheckedUpdateManyWithoutUpdatedByNestedInput = {
    create?: XOR<TravelAgencyCreateWithoutUpdatedByInput, TravelAgencyUncheckedCreateWithoutUpdatedByInput> | TravelAgencyCreateWithoutUpdatedByInput[] | TravelAgencyUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: TravelAgencyCreateOrConnectWithoutUpdatedByInput | TravelAgencyCreateOrConnectWithoutUpdatedByInput[]
    upsert?: TravelAgencyUpsertWithWhereUniqueWithoutUpdatedByInput | TravelAgencyUpsertWithWhereUniqueWithoutUpdatedByInput[]
    createMany?: TravelAgencyCreateManyUpdatedByInputEnvelope
    set?: TravelAgencyWhereUniqueInput | TravelAgencyWhereUniqueInput[]
    disconnect?: TravelAgencyWhereUniqueInput | TravelAgencyWhereUniqueInput[]
    delete?: TravelAgencyWhereUniqueInput | TravelAgencyWhereUniqueInput[]
    connect?: TravelAgencyWhereUniqueInput | TravelAgencyWhereUniqueInput[]
    update?: TravelAgencyUpdateWithWhereUniqueWithoutUpdatedByInput | TravelAgencyUpdateWithWhereUniqueWithoutUpdatedByInput[]
    updateMany?: TravelAgencyUpdateManyWithWhereWithoutUpdatedByInput | TravelAgencyUpdateManyWithWhereWithoutUpdatedByInput[]
    deleteMany?: TravelAgencyScalarWhereInput | TravelAgencyScalarWhereInput[]
  }

  export type CarBookingUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<CarBookingCreateWithoutCreatedByInput, CarBookingUncheckedCreateWithoutCreatedByInput> | CarBookingCreateWithoutCreatedByInput[] | CarBookingUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: CarBookingCreateOrConnectWithoutCreatedByInput | CarBookingCreateOrConnectWithoutCreatedByInput[]
    upsert?: CarBookingUpsertWithWhereUniqueWithoutCreatedByInput | CarBookingUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: CarBookingCreateManyCreatedByInputEnvelope
    set?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    disconnect?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    delete?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    connect?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    update?: CarBookingUpdateWithWhereUniqueWithoutCreatedByInput | CarBookingUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: CarBookingUpdateManyWithWhereWithoutCreatedByInput | CarBookingUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: CarBookingScalarWhereInput | CarBookingScalarWhereInput[]
  }

  export type CarBookingUncheckedUpdateManyWithoutUpdatedByNestedInput = {
    create?: XOR<CarBookingCreateWithoutUpdatedByInput, CarBookingUncheckedCreateWithoutUpdatedByInput> | CarBookingCreateWithoutUpdatedByInput[] | CarBookingUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: CarBookingCreateOrConnectWithoutUpdatedByInput | CarBookingCreateOrConnectWithoutUpdatedByInput[]
    upsert?: CarBookingUpsertWithWhereUniqueWithoutUpdatedByInput | CarBookingUpsertWithWhereUniqueWithoutUpdatedByInput[]
    createMany?: CarBookingCreateManyUpdatedByInputEnvelope
    set?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    disconnect?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    delete?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    connect?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    update?: CarBookingUpdateWithWhereUniqueWithoutUpdatedByInput | CarBookingUpdateWithWhereUniqueWithoutUpdatedByInput[]
    updateMany?: CarBookingUpdateManyWithWhereWithoutUpdatedByInput | CarBookingUpdateManyWithWhereWithoutUpdatedByInput[]
    deleteMany?: CarBookingScalarWhereInput | CarBookingScalarWhereInput[]
  }

  export type PaymentRecordUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<PaymentRecordCreateWithoutCreatedByInput, PaymentRecordUncheckedCreateWithoutCreatedByInput> | PaymentRecordCreateWithoutCreatedByInput[] | PaymentRecordUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: PaymentRecordCreateOrConnectWithoutCreatedByInput | PaymentRecordCreateOrConnectWithoutCreatedByInput[]
    upsert?: PaymentRecordUpsertWithWhereUniqueWithoutCreatedByInput | PaymentRecordUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: PaymentRecordCreateManyCreatedByInputEnvelope
    set?: PaymentRecordWhereUniqueInput | PaymentRecordWhereUniqueInput[]
    disconnect?: PaymentRecordWhereUniqueInput | PaymentRecordWhereUniqueInput[]
    delete?: PaymentRecordWhereUniqueInput | PaymentRecordWhereUniqueInput[]
    connect?: PaymentRecordWhereUniqueInput | PaymentRecordWhereUniqueInput[]
    update?: PaymentRecordUpdateWithWhereUniqueWithoutCreatedByInput | PaymentRecordUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: PaymentRecordUpdateManyWithWhereWithoutCreatedByInput | PaymentRecordUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: PaymentRecordScalarWhereInput | PaymentRecordScalarWhereInput[]
  }

  export type ExpenseUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<ExpenseCreateWithoutCreatedByInput, ExpenseUncheckedCreateWithoutCreatedByInput> | ExpenseCreateWithoutCreatedByInput[] | ExpenseUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutCreatedByInput | ExpenseCreateOrConnectWithoutCreatedByInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutCreatedByInput | ExpenseUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: ExpenseCreateManyCreatedByInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutCreatedByInput | ExpenseUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutCreatedByInput | ExpenseUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type ExpenseUncheckedUpdateManyWithoutUpdatedByNestedInput = {
    create?: XOR<ExpenseCreateWithoutUpdatedByInput, ExpenseUncheckedCreateWithoutUpdatedByInput> | ExpenseCreateWithoutUpdatedByInput[] | ExpenseUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: ExpenseCreateOrConnectWithoutUpdatedByInput | ExpenseCreateOrConnectWithoutUpdatedByInput[]
    upsert?: ExpenseUpsertWithWhereUniqueWithoutUpdatedByInput | ExpenseUpsertWithWhereUniqueWithoutUpdatedByInput[]
    createMany?: ExpenseCreateManyUpdatedByInputEnvelope
    set?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    disconnect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    delete?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    connect?: ExpenseWhereUniqueInput | ExpenseWhereUniqueInput[]
    update?: ExpenseUpdateWithWhereUniqueWithoutUpdatedByInput | ExpenseUpdateWithWhereUniqueWithoutUpdatedByInput[]
    updateMany?: ExpenseUpdateManyWithWhereWithoutUpdatedByInput | ExpenseUpdateManyWithWhereWithoutUpdatedByInput[]
    deleteMany?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutRefreshTokensInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRefreshTokensNestedInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput
    upsert?: UserUpsertWithoutRefreshTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRefreshTokensInput, UserUpdateWithoutRefreshTokensInput>, UserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type UserCreateNestedOneWithoutCreatedTravelAgenciesInput = {
    create?: XOR<UserCreateWithoutCreatedTravelAgenciesInput, UserUncheckedCreateWithoutCreatedTravelAgenciesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedTravelAgenciesInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutUpdatedTravelAgenciesInput = {
    create?: XOR<UserCreateWithoutUpdatedTravelAgenciesInput, UserUncheckedCreateWithoutUpdatedTravelAgenciesInput>
    connectOrCreate?: UserCreateOrConnectWithoutUpdatedTravelAgenciesInput
    connect?: UserWhereUniqueInput
  }

  export type CarBookingCreateNestedManyWithoutTravelAgencyInput = {
    create?: XOR<CarBookingCreateWithoutTravelAgencyInput, CarBookingUncheckedCreateWithoutTravelAgencyInput> | CarBookingCreateWithoutTravelAgencyInput[] | CarBookingUncheckedCreateWithoutTravelAgencyInput[]
    connectOrCreate?: CarBookingCreateOrConnectWithoutTravelAgencyInput | CarBookingCreateOrConnectWithoutTravelAgencyInput[]
    createMany?: CarBookingCreateManyTravelAgencyInputEnvelope
    connect?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
  }

  export type CarBookingCreateNestedManyWithoutTransferToAgencyInput = {
    create?: XOR<CarBookingCreateWithoutTransferToAgencyInput, CarBookingUncheckedCreateWithoutTransferToAgencyInput> | CarBookingCreateWithoutTransferToAgencyInput[] | CarBookingUncheckedCreateWithoutTransferToAgencyInput[]
    connectOrCreate?: CarBookingCreateOrConnectWithoutTransferToAgencyInput | CarBookingCreateOrConnectWithoutTransferToAgencyInput[]
    createMany?: CarBookingCreateManyTransferToAgencyInputEnvelope
    connect?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
  }

  export type CarBookingUncheckedCreateNestedManyWithoutTravelAgencyInput = {
    create?: XOR<CarBookingCreateWithoutTravelAgencyInput, CarBookingUncheckedCreateWithoutTravelAgencyInput> | CarBookingCreateWithoutTravelAgencyInput[] | CarBookingUncheckedCreateWithoutTravelAgencyInput[]
    connectOrCreate?: CarBookingCreateOrConnectWithoutTravelAgencyInput | CarBookingCreateOrConnectWithoutTravelAgencyInput[]
    createMany?: CarBookingCreateManyTravelAgencyInputEnvelope
    connect?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
  }

  export type CarBookingUncheckedCreateNestedManyWithoutTransferToAgencyInput = {
    create?: XOR<CarBookingCreateWithoutTransferToAgencyInput, CarBookingUncheckedCreateWithoutTransferToAgencyInput> | CarBookingCreateWithoutTransferToAgencyInput[] | CarBookingUncheckedCreateWithoutTransferToAgencyInput[]
    connectOrCreate?: CarBookingCreateOrConnectWithoutTransferToAgencyInput | CarBookingCreateOrConnectWithoutTransferToAgencyInput[]
    createMany?: CarBookingCreateManyTransferToAgencyInputEnvelope
    connect?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
  }

  export type UserUpdateOneWithoutCreatedTravelAgenciesNestedInput = {
    create?: XOR<UserCreateWithoutCreatedTravelAgenciesInput, UserUncheckedCreateWithoutCreatedTravelAgenciesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedTravelAgenciesInput
    upsert?: UserUpsertWithoutCreatedTravelAgenciesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedTravelAgenciesInput, UserUpdateWithoutCreatedTravelAgenciesInput>, UserUncheckedUpdateWithoutCreatedTravelAgenciesInput>
  }

  export type UserUpdateOneWithoutUpdatedTravelAgenciesNestedInput = {
    create?: XOR<UserCreateWithoutUpdatedTravelAgenciesInput, UserUncheckedCreateWithoutUpdatedTravelAgenciesInput>
    connectOrCreate?: UserCreateOrConnectWithoutUpdatedTravelAgenciesInput
    upsert?: UserUpsertWithoutUpdatedTravelAgenciesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUpdatedTravelAgenciesInput, UserUpdateWithoutUpdatedTravelAgenciesInput>, UserUncheckedUpdateWithoutUpdatedTravelAgenciesInput>
  }

  export type CarBookingUpdateManyWithoutTravelAgencyNestedInput = {
    create?: XOR<CarBookingCreateWithoutTravelAgencyInput, CarBookingUncheckedCreateWithoutTravelAgencyInput> | CarBookingCreateWithoutTravelAgencyInput[] | CarBookingUncheckedCreateWithoutTravelAgencyInput[]
    connectOrCreate?: CarBookingCreateOrConnectWithoutTravelAgencyInput | CarBookingCreateOrConnectWithoutTravelAgencyInput[]
    upsert?: CarBookingUpsertWithWhereUniqueWithoutTravelAgencyInput | CarBookingUpsertWithWhereUniqueWithoutTravelAgencyInput[]
    createMany?: CarBookingCreateManyTravelAgencyInputEnvelope
    set?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    disconnect?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    delete?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    connect?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    update?: CarBookingUpdateWithWhereUniqueWithoutTravelAgencyInput | CarBookingUpdateWithWhereUniqueWithoutTravelAgencyInput[]
    updateMany?: CarBookingUpdateManyWithWhereWithoutTravelAgencyInput | CarBookingUpdateManyWithWhereWithoutTravelAgencyInput[]
    deleteMany?: CarBookingScalarWhereInput | CarBookingScalarWhereInput[]
  }

  export type CarBookingUpdateManyWithoutTransferToAgencyNestedInput = {
    create?: XOR<CarBookingCreateWithoutTransferToAgencyInput, CarBookingUncheckedCreateWithoutTransferToAgencyInput> | CarBookingCreateWithoutTransferToAgencyInput[] | CarBookingUncheckedCreateWithoutTransferToAgencyInput[]
    connectOrCreate?: CarBookingCreateOrConnectWithoutTransferToAgencyInput | CarBookingCreateOrConnectWithoutTransferToAgencyInput[]
    upsert?: CarBookingUpsertWithWhereUniqueWithoutTransferToAgencyInput | CarBookingUpsertWithWhereUniqueWithoutTransferToAgencyInput[]
    createMany?: CarBookingCreateManyTransferToAgencyInputEnvelope
    set?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    disconnect?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    delete?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    connect?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    update?: CarBookingUpdateWithWhereUniqueWithoutTransferToAgencyInput | CarBookingUpdateWithWhereUniqueWithoutTransferToAgencyInput[]
    updateMany?: CarBookingUpdateManyWithWhereWithoutTransferToAgencyInput | CarBookingUpdateManyWithWhereWithoutTransferToAgencyInput[]
    deleteMany?: CarBookingScalarWhereInput | CarBookingScalarWhereInput[]
  }

  export type CarBookingUncheckedUpdateManyWithoutTravelAgencyNestedInput = {
    create?: XOR<CarBookingCreateWithoutTravelAgencyInput, CarBookingUncheckedCreateWithoutTravelAgencyInput> | CarBookingCreateWithoutTravelAgencyInput[] | CarBookingUncheckedCreateWithoutTravelAgencyInput[]
    connectOrCreate?: CarBookingCreateOrConnectWithoutTravelAgencyInput | CarBookingCreateOrConnectWithoutTravelAgencyInput[]
    upsert?: CarBookingUpsertWithWhereUniqueWithoutTravelAgencyInput | CarBookingUpsertWithWhereUniqueWithoutTravelAgencyInput[]
    createMany?: CarBookingCreateManyTravelAgencyInputEnvelope
    set?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    disconnect?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    delete?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    connect?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    update?: CarBookingUpdateWithWhereUniqueWithoutTravelAgencyInput | CarBookingUpdateWithWhereUniqueWithoutTravelAgencyInput[]
    updateMany?: CarBookingUpdateManyWithWhereWithoutTravelAgencyInput | CarBookingUpdateManyWithWhereWithoutTravelAgencyInput[]
    deleteMany?: CarBookingScalarWhereInput | CarBookingScalarWhereInput[]
  }

  export type CarBookingUncheckedUpdateManyWithoutTransferToAgencyNestedInput = {
    create?: XOR<CarBookingCreateWithoutTransferToAgencyInput, CarBookingUncheckedCreateWithoutTransferToAgencyInput> | CarBookingCreateWithoutTransferToAgencyInput[] | CarBookingUncheckedCreateWithoutTransferToAgencyInput[]
    connectOrCreate?: CarBookingCreateOrConnectWithoutTransferToAgencyInput | CarBookingCreateOrConnectWithoutTransferToAgencyInput[]
    upsert?: CarBookingUpsertWithWhereUniqueWithoutTransferToAgencyInput | CarBookingUpsertWithWhereUniqueWithoutTransferToAgencyInput[]
    createMany?: CarBookingCreateManyTransferToAgencyInputEnvelope
    set?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    disconnect?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    delete?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    connect?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    update?: CarBookingUpdateWithWhereUniqueWithoutTransferToAgencyInput | CarBookingUpdateWithWhereUniqueWithoutTransferToAgencyInput[]
    updateMany?: CarBookingUpdateManyWithWhereWithoutTransferToAgencyInput | CarBookingUpdateManyWithWhereWithoutTransferToAgencyInput[]
    deleteMany?: CarBookingScalarWhereInput | CarBookingScalarWhereInput[]
  }

  export type TravelAgencyCreateNestedOneWithoutCarBookingsInput = {
    create?: XOR<TravelAgencyCreateWithoutCarBookingsInput, TravelAgencyUncheckedCreateWithoutCarBookingsInput>
    connectOrCreate?: TravelAgencyCreateOrConnectWithoutCarBookingsInput
    connect?: TravelAgencyWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCreatedCarBookingsInput = {
    create?: XOR<UserCreateWithoutCreatedCarBookingsInput, UserUncheckedCreateWithoutCreatedCarBookingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedCarBookingsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutUpdatedCarBookingsInput = {
    create?: XOR<UserCreateWithoutUpdatedCarBookingsInput, UserUncheckedCreateWithoutUpdatedCarBookingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUpdatedCarBookingsInput
    connect?: UserWhereUniqueInput
  }

  export type CarBookingCreateNestedOneWithoutTransferBookingsInput = {
    create?: XOR<CarBookingCreateWithoutTransferBookingsInput, CarBookingUncheckedCreateWithoutTransferBookingsInput>
    connectOrCreate?: CarBookingCreateOrConnectWithoutTransferBookingsInput
    connect?: CarBookingWhereUniqueInput
  }

  export type CarBookingCreateNestedManyWithoutTransferFromInput = {
    create?: XOR<CarBookingCreateWithoutTransferFromInput, CarBookingUncheckedCreateWithoutTransferFromInput> | CarBookingCreateWithoutTransferFromInput[] | CarBookingUncheckedCreateWithoutTransferFromInput[]
    connectOrCreate?: CarBookingCreateOrConnectWithoutTransferFromInput | CarBookingCreateOrConnectWithoutTransferFromInput[]
    createMany?: CarBookingCreateManyTransferFromInputEnvelope
    connect?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
  }

  export type TravelAgencyCreateNestedOneWithoutTransferredCarBookingsInput = {
    create?: XOR<TravelAgencyCreateWithoutTransferredCarBookingsInput, TravelAgencyUncheckedCreateWithoutTransferredCarBookingsInput>
    connectOrCreate?: TravelAgencyCreateOrConnectWithoutTransferredCarBookingsInput
    connect?: TravelAgencyWhereUniqueInput
  }

  export type CarBookingUncheckedCreateNestedManyWithoutTransferFromInput = {
    create?: XOR<CarBookingCreateWithoutTransferFromInput, CarBookingUncheckedCreateWithoutTransferFromInput> | CarBookingCreateWithoutTransferFromInput[] | CarBookingUncheckedCreateWithoutTransferFromInput[]
    connectOrCreate?: CarBookingCreateOrConnectWithoutTransferFromInput | CarBookingCreateOrConnectWithoutTransferFromInput[]
    createMany?: CarBookingCreateManyTransferFromInputEnvelope
    connect?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
  }

  export type EnumTransportTypeFieldUpdateOperationsInput = {
    set?: $Enums.TransportType
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumPaymentCollectionFieldUpdateOperationsInput = {
    set?: $Enums.PaymentCollection
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type EnumCarBookingStatusFieldUpdateOperationsInput = {
    set?: $Enums.CarBookingStatus
  }

  export type TravelAgencyUpdateOneWithoutCarBookingsNestedInput = {
    create?: XOR<TravelAgencyCreateWithoutCarBookingsInput, TravelAgencyUncheckedCreateWithoutCarBookingsInput>
    connectOrCreate?: TravelAgencyCreateOrConnectWithoutCarBookingsInput
    upsert?: TravelAgencyUpsertWithoutCarBookingsInput
    disconnect?: TravelAgencyWhereInput | boolean
    delete?: TravelAgencyWhereInput | boolean
    connect?: TravelAgencyWhereUniqueInput
    update?: XOR<XOR<TravelAgencyUpdateToOneWithWhereWithoutCarBookingsInput, TravelAgencyUpdateWithoutCarBookingsInput>, TravelAgencyUncheckedUpdateWithoutCarBookingsInput>
  }

  export type UserUpdateOneWithoutCreatedCarBookingsNestedInput = {
    create?: XOR<UserCreateWithoutCreatedCarBookingsInput, UserUncheckedCreateWithoutCreatedCarBookingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedCarBookingsInput
    upsert?: UserUpsertWithoutCreatedCarBookingsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedCarBookingsInput, UserUpdateWithoutCreatedCarBookingsInput>, UserUncheckedUpdateWithoutCreatedCarBookingsInput>
  }

  export type UserUpdateOneWithoutUpdatedCarBookingsNestedInput = {
    create?: XOR<UserCreateWithoutUpdatedCarBookingsInput, UserUncheckedCreateWithoutUpdatedCarBookingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUpdatedCarBookingsInput
    upsert?: UserUpsertWithoutUpdatedCarBookingsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUpdatedCarBookingsInput, UserUpdateWithoutUpdatedCarBookingsInput>, UserUncheckedUpdateWithoutUpdatedCarBookingsInput>
  }

  export type CarBookingUpdateOneWithoutTransferBookingsNestedInput = {
    create?: XOR<CarBookingCreateWithoutTransferBookingsInput, CarBookingUncheckedCreateWithoutTransferBookingsInput>
    connectOrCreate?: CarBookingCreateOrConnectWithoutTransferBookingsInput
    upsert?: CarBookingUpsertWithoutTransferBookingsInput
    disconnect?: CarBookingWhereInput | boolean
    delete?: CarBookingWhereInput | boolean
    connect?: CarBookingWhereUniqueInput
    update?: XOR<XOR<CarBookingUpdateToOneWithWhereWithoutTransferBookingsInput, CarBookingUpdateWithoutTransferBookingsInput>, CarBookingUncheckedUpdateWithoutTransferBookingsInput>
  }

  export type CarBookingUpdateManyWithoutTransferFromNestedInput = {
    create?: XOR<CarBookingCreateWithoutTransferFromInput, CarBookingUncheckedCreateWithoutTransferFromInput> | CarBookingCreateWithoutTransferFromInput[] | CarBookingUncheckedCreateWithoutTransferFromInput[]
    connectOrCreate?: CarBookingCreateOrConnectWithoutTransferFromInput | CarBookingCreateOrConnectWithoutTransferFromInput[]
    upsert?: CarBookingUpsertWithWhereUniqueWithoutTransferFromInput | CarBookingUpsertWithWhereUniqueWithoutTransferFromInput[]
    createMany?: CarBookingCreateManyTransferFromInputEnvelope
    set?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    disconnect?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    delete?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    connect?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    update?: CarBookingUpdateWithWhereUniqueWithoutTransferFromInput | CarBookingUpdateWithWhereUniqueWithoutTransferFromInput[]
    updateMany?: CarBookingUpdateManyWithWhereWithoutTransferFromInput | CarBookingUpdateManyWithWhereWithoutTransferFromInput[]
    deleteMany?: CarBookingScalarWhereInput | CarBookingScalarWhereInput[]
  }

  export type TravelAgencyUpdateOneWithoutTransferredCarBookingsNestedInput = {
    create?: XOR<TravelAgencyCreateWithoutTransferredCarBookingsInput, TravelAgencyUncheckedCreateWithoutTransferredCarBookingsInput>
    connectOrCreate?: TravelAgencyCreateOrConnectWithoutTransferredCarBookingsInput
    upsert?: TravelAgencyUpsertWithoutTransferredCarBookingsInput
    disconnect?: TravelAgencyWhereInput | boolean
    delete?: TravelAgencyWhereInput | boolean
    connect?: TravelAgencyWhereUniqueInput
    update?: XOR<XOR<TravelAgencyUpdateToOneWithWhereWithoutTransferredCarBookingsInput, TravelAgencyUpdateWithoutTransferredCarBookingsInput>, TravelAgencyUncheckedUpdateWithoutTransferredCarBookingsInput>
  }

  export type CarBookingUncheckedUpdateManyWithoutTransferFromNestedInput = {
    create?: XOR<CarBookingCreateWithoutTransferFromInput, CarBookingUncheckedCreateWithoutTransferFromInput> | CarBookingCreateWithoutTransferFromInput[] | CarBookingUncheckedCreateWithoutTransferFromInput[]
    connectOrCreate?: CarBookingCreateOrConnectWithoutTransferFromInput | CarBookingCreateOrConnectWithoutTransferFromInput[]
    upsert?: CarBookingUpsertWithWhereUniqueWithoutTransferFromInput | CarBookingUpsertWithWhereUniqueWithoutTransferFromInput[]
    createMany?: CarBookingCreateManyTransferFromInputEnvelope
    set?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    disconnect?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    delete?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    connect?: CarBookingWhereUniqueInput | CarBookingWhereUniqueInput[]
    update?: CarBookingUpdateWithWhereUniqueWithoutTransferFromInput | CarBookingUpdateWithWhereUniqueWithoutTransferFromInput[]
    updateMany?: CarBookingUpdateManyWithWhereWithoutTransferFromInput | CarBookingUpdateManyWithWhereWithoutTransferFromInput[]
    deleteMany?: CarBookingScalarWhereInput | CarBookingScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCreatedPaymentRecordsInput = {
    create?: XOR<UserCreateWithoutCreatedPaymentRecordsInput, UserUncheckedCreateWithoutCreatedPaymentRecordsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedPaymentRecordsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumPartnerTypeFieldUpdateOperationsInput = {
    set?: $Enums.PartnerType
  }

  export type EnumPaymentDirectionFieldUpdateOperationsInput = {
    set?: $Enums.PaymentDirection
  }

  export type UserUpdateOneWithoutCreatedPaymentRecordsNestedInput = {
    create?: XOR<UserCreateWithoutCreatedPaymentRecordsInput, UserUncheckedCreateWithoutCreatedPaymentRecordsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedPaymentRecordsInput
    upsert?: UserUpsertWithoutCreatedPaymentRecordsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedPaymentRecordsInput, UserUpdateWithoutCreatedPaymentRecordsInput>, UserUncheckedUpdateWithoutCreatedPaymentRecordsInput>
  }

  export type UserCreateNestedOneWithoutCreatedExpensesInput = {
    create?: XOR<UserCreateWithoutCreatedExpensesInput, UserUncheckedCreateWithoutCreatedExpensesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedExpensesInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutUpdatedExpensesInput = {
    create?: XOR<UserCreateWithoutUpdatedExpensesInput, UserUncheckedCreateWithoutUpdatedExpensesInput>
    connectOrCreate?: UserCreateOrConnectWithoutUpdatedExpensesInput
    connect?: UserWhereUniqueInput
  }

  export type EnumExpenseCategoryFieldUpdateOperationsInput = {
    set?: $Enums.ExpenseCategory
  }

  export type UserUpdateOneWithoutCreatedExpensesNestedInput = {
    create?: XOR<UserCreateWithoutCreatedExpensesInput, UserUncheckedCreateWithoutCreatedExpensesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedExpensesInput
    upsert?: UserUpsertWithoutCreatedExpensesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedExpensesInput, UserUpdateWithoutCreatedExpensesInput>, UserUncheckedUpdateWithoutCreatedExpensesInput>
  }

  export type UserUpdateOneWithoutUpdatedExpensesNestedInput = {
    create?: XOR<UserCreateWithoutUpdatedExpensesInput, UserUncheckedCreateWithoutUpdatedExpensesInput>
    connectOrCreate?: UserCreateOrConnectWithoutUpdatedExpensesInput
    upsert?: UserUpsertWithoutUpdatedExpensesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUpdatedExpensesInput, UserUpdateWithoutUpdatedExpensesInput>, UserUncheckedUpdateWithoutUpdatedExpensesInput>
  }

  export type UserCreateNestedOneWithoutActivityLogsInput = {
    create?: XOR<UserCreateWithoutActivityLogsInput, UserUncheckedCreateWithoutActivityLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivityLogsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumActivityActionFieldUpdateOperationsInput = {
    set?: $Enums.ActivityAction
  }

  export type UserUpdateOneWithoutActivityLogsNestedInput = {
    create?: XOR<UserCreateWithoutActivityLogsInput, UserUncheckedCreateWithoutActivityLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivityLogsInput
    upsert?: UserUpsertWithoutActivityLogsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutActivityLogsInput, UserUpdateWithoutActivityLogsInput>, UserUncheckedUpdateWithoutActivityLogsInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumTransportTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransportType | EnumTransportTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransportType[] | ListEnumTransportTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransportType[] | ListEnumTransportTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransportTypeFilter<$PrismaModel> | $Enums.TransportType
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumPaymentCollectionFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentCollection | EnumPaymentCollectionFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentCollection[] | ListEnumPaymentCollectionFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentCollection[] | ListEnumPaymentCollectionFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentCollectionFilter<$PrismaModel> | $Enums.PaymentCollection
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedEnumCarBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.CarBookingStatus | EnumCarBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CarBookingStatus[] | ListEnumCarBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CarBookingStatus[] | ListEnumCarBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCarBookingStatusFilter<$PrismaModel> | $Enums.CarBookingStatus
  }

  export type NestedEnumTransportTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransportType | EnumTransportTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransportType[] | ListEnumTransportTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransportType[] | ListEnumTransportTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransportTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransportType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransportTypeFilter<$PrismaModel>
    _max?: NestedEnumTransportTypeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumPaymentCollectionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentCollection | EnumPaymentCollectionFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentCollection[] | ListEnumPaymentCollectionFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentCollection[] | ListEnumPaymentCollectionFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentCollectionWithAggregatesFilter<$PrismaModel> | $Enums.PaymentCollection
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentCollectionFilter<$PrismaModel>
    _max?: NestedEnumPaymentCollectionFilter<$PrismaModel>
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type NestedEnumCarBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CarBookingStatus | EnumCarBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.CarBookingStatus[] | ListEnumCarBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.CarBookingStatus[] | ListEnumCarBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumCarBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.CarBookingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCarBookingStatusFilter<$PrismaModel>
    _max?: NestedEnumCarBookingStatusFilter<$PrismaModel>
  }

  export type NestedEnumPartnerTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PartnerType | EnumPartnerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PartnerType[] | ListEnumPartnerTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PartnerType[] | ListEnumPartnerTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPartnerTypeFilter<$PrismaModel> | $Enums.PartnerType
  }

  export type NestedEnumPaymentDirectionFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentDirection | EnumPaymentDirectionFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentDirection[] | ListEnumPaymentDirectionFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentDirection[] | ListEnumPaymentDirectionFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentDirectionFilter<$PrismaModel> | $Enums.PaymentDirection
  }

  export type NestedEnumPartnerTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PartnerType | EnumPartnerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PartnerType[] | ListEnumPartnerTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PartnerType[] | ListEnumPartnerTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPartnerTypeWithAggregatesFilter<$PrismaModel> | $Enums.PartnerType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPartnerTypeFilter<$PrismaModel>
    _max?: NestedEnumPartnerTypeFilter<$PrismaModel>
  }

  export type NestedEnumPaymentDirectionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentDirection | EnumPaymentDirectionFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentDirection[] | ListEnumPaymentDirectionFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentDirection[] | ListEnumPaymentDirectionFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentDirectionWithAggregatesFilter<$PrismaModel> | $Enums.PaymentDirection
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentDirectionFilter<$PrismaModel>
    _max?: NestedEnumPaymentDirectionFilter<$PrismaModel>
  }

  export type NestedEnumExpenseCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.ExpenseCategory | EnumExpenseCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ExpenseCategory[] | ListEnumExpenseCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExpenseCategory[] | ListEnumExpenseCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumExpenseCategoryFilter<$PrismaModel> | $Enums.ExpenseCategory
  }

  export type NestedEnumExpenseCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExpenseCategory | EnumExpenseCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ExpenseCategory[] | ListEnumExpenseCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExpenseCategory[] | ListEnumExpenseCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumExpenseCategoryWithAggregatesFilter<$PrismaModel> | $Enums.ExpenseCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExpenseCategoryFilter<$PrismaModel>
    _max?: NestedEnumExpenseCategoryFilter<$PrismaModel>
  }

  export type NestedEnumActivityActionFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivityAction | EnumActivityActionFieldRefInput<$PrismaModel>
    in?: $Enums.ActivityAction[] | ListEnumActivityActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.ActivityAction[] | ListEnumActivityActionFieldRefInput<$PrismaModel>
    not?: NestedEnumActivityActionFilter<$PrismaModel> | $Enums.ActivityAction
  }

  export type NestedEnumActivityActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ActivityAction | EnumActivityActionFieldRefInput<$PrismaModel>
    in?: $Enums.ActivityAction[] | ListEnumActivityActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.ActivityAction[] | ListEnumActivityActionFieldRefInput<$PrismaModel>
    not?: NestedEnumActivityActionWithAggregatesFilter<$PrismaModel> | $Enums.ActivityAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumActivityActionFilter<$PrismaModel>
    _max?: NestedEnumActivityActionFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type RefreshTokenCreateWithoutUserInput = {
    id?: string
    jti: string
    token: string
    deviceInfo?: string | null
    ipAddress?: string | null
    expiresAt: Date | string
    isRevoked?: boolean
    revokedAt?: Date | string | null
    revokedBy?: string | null
    createdAt?: Date | string
    lastUsedAt?: Date | string | null
  }

  export type RefreshTokenUncheckedCreateWithoutUserInput = {
    id?: string
    jti: string
    token: string
    deviceInfo?: string | null
    ipAddress?: string | null
    expiresAt: Date | string
    isRevoked?: boolean
    revokedAt?: Date | string | null
    revokedBy?: string | null
    createdAt?: Date | string
    lastUsedAt?: Date | string | null
  }

  export type RefreshTokenCreateOrConnectWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenCreateManyUserInputEnvelope = {
    data: RefreshTokenCreateManyUserInput | RefreshTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ActivityLogCreateWithoutUserInput = {
    id?: string
    action: $Enums.ActivityAction
    entityType: string
    entityId?: string | null
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type ActivityLogUncheckedCreateWithoutUserInput = {
    id?: string
    action: $Enums.ActivityAction
    entityType: string
    entityId?: string | null
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type ActivityLogCreateOrConnectWithoutUserInput = {
    where: ActivityLogWhereUniqueInput
    create: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput>
  }

  export type ActivityLogCreateManyUserInputEnvelope = {
    data: ActivityLogCreateManyUserInput | ActivityLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TravelAgencyCreateWithoutCreatedByInput = {
    id?: string
    name: string
    tel?: string | null
    address?: string | null
    note?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: UserCreateNestedOneWithoutUpdatedTravelAgenciesInput
    carBookings?: CarBookingCreateNestedManyWithoutTravelAgencyInput
    transferredCarBookings?: CarBookingCreateNestedManyWithoutTransferToAgencyInput
  }

  export type TravelAgencyUncheckedCreateWithoutCreatedByInput = {
    id?: string
    name: string
    tel?: string | null
    address?: string | null
    note?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedById?: string | null
    carBookings?: CarBookingUncheckedCreateNestedManyWithoutTravelAgencyInput
    transferredCarBookings?: CarBookingUncheckedCreateNestedManyWithoutTransferToAgencyInput
  }

  export type TravelAgencyCreateOrConnectWithoutCreatedByInput = {
    where: TravelAgencyWhereUniqueInput
    create: XOR<TravelAgencyCreateWithoutCreatedByInput, TravelAgencyUncheckedCreateWithoutCreatedByInput>
  }

  export type TravelAgencyCreateManyCreatedByInputEnvelope = {
    data: TravelAgencyCreateManyCreatedByInput | TravelAgencyCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type TravelAgencyCreateWithoutUpdatedByInput = {
    id?: string
    name: string
    tel?: string | null
    address?: string | null
    note?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedTravelAgenciesInput
    carBookings?: CarBookingCreateNestedManyWithoutTravelAgencyInput
    transferredCarBookings?: CarBookingCreateNestedManyWithoutTransferToAgencyInput
  }

  export type TravelAgencyUncheckedCreateWithoutUpdatedByInput = {
    id?: string
    name: string
    tel?: string | null
    address?: string | null
    note?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    carBookings?: CarBookingUncheckedCreateNestedManyWithoutTravelAgencyInput
    transferredCarBookings?: CarBookingUncheckedCreateNestedManyWithoutTransferToAgencyInput
  }

  export type TravelAgencyCreateOrConnectWithoutUpdatedByInput = {
    where: TravelAgencyWhereUniqueInput
    create: XOR<TravelAgencyCreateWithoutUpdatedByInput, TravelAgencyUncheckedCreateWithoutUpdatedByInput>
  }

  export type TravelAgencyCreateManyUpdatedByInputEnvelope = {
    data: TravelAgencyCreateManyUpdatedByInput | TravelAgencyCreateManyUpdatedByInput[]
    skipDuplicates?: boolean
  }

  export type CarBookingCreateWithoutCreatedByInput = {
    id?: string
    bookingCode: string
    vehicleType: $Enums.TransportType
    serviceDate: Date | string
    guestName: string
    guestPhone?: string | null
    guestCount?: number
    pickupLocation?: string | null
    dropoffLocation?: string | null
    vat?: boolean
    sellingPrice: Decimal | DecimalJsLike | number | string
    receivingPrice: Decimal | DecimalJsLike | number | string
    debtAmount: Decimal | DecimalJsLike | number | string
    paymentCollection: $Enums.PaymentCollection
    paymentCollectionNote?: string | null
    paymentStatus?: $Enums.PaymentStatus
    paidAt?: Date | string | null
    status?: $Enums.CarBookingStatus
    note?: string | null
    routes?: string | null
    isTransfer?: boolean
    transferReason?: string | null
    transferredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    travelAgency?: TravelAgencyCreateNestedOneWithoutCarBookingsInput
    updatedBy?: UserCreateNestedOneWithoutUpdatedCarBookingsInput
    transferFrom?: CarBookingCreateNestedOneWithoutTransferBookingsInput
    transferBookings?: CarBookingCreateNestedManyWithoutTransferFromInput
    transferToAgency?: TravelAgencyCreateNestedOneWithoutTransferredCarBookingsInput
  }

  export type CarBookingUncheckedCreateWithoutCreatedByInput = {
    id?: string
    bookingCode: string
    travelAgencyId?: string | null
    vehicleType: $Enums.TransportType
    serviceDate: Date | string
    guestName: string
    guestPhone?: string | null
    guestCount?: number
    pickupLocation?: string | null
    dropoffLocation?: string | null
    vat?: boolean
    sellingPrice: Decimal | DecimalJsLike | number | string
    receivingPrice: Decimal | DecimalJsLike | number | string
    debtAmount: Decimal | DecimalJsLike | number | string
    paymentCollection: $Enums.PaymentCollection
    paymentCollectionNote?: string | null
    paymentStatus?: $Enums.PaymentStatus
    paidAt?: Date | string | null
    status?: $Enums.CarBookingStatus
    note?: string | null
    routes?: string | null
    isTransfer?: boolean
    transferFromId?: string | null
    transferToAgencyId?: string | null
    transferReason?: string | null
    transferredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedById?: string | null
    transferBookings?: CarBookingUncheckedCreateNestedManyWithoutTransferFromInput
  }

  export type CarBookingCreateOrConnectWithoutCreatedByInput = {
    where: CarBookingWhereUniqueInput
    create: XOR<CarBookingCreateWithoutCreatedByInput, CarBookingUncheckedCreateWithoutCreatedByInput>
  }

  export type CarBookingCreateManyCreatedByInputEnvelope = {
    data: CarBookingCreateManyCreatedByInput | CarBookingCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type CarBookingCreateWithoutUpdatedByInput = {
    id?: string
    bookingCode: string
    vehicleType: $Enums.TransportType
    serviceDate: Date | string
    guestName: string
    guestPhone?: string | null
    guestCount?: number
    pickupLocation?: string | null
    dropoffLocation?: string | null
    vat?: boolean
    sellingPrice: Decimal | DecimalJsLike | number | string
    receivingPrice: Decimal | DecimalJsLike | number | string
    debtAmount: Decimal | DecimalJsLike | number | string
    paymentCollection: $Enums.PaymentCollection
    paymentCollectionNote?: string | null
    paymentStatus?: $Enums.PaymentStatus
    paidAt?: Date | string | null
    status?: $Enums.CarBookingStatus
    note?: string | null
    routes?: string | null
    isTransfer?: boolean
    transferReason?: string | null
    transferredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    travelAgency?: TravelAgencyCreateNestedOneWithoutCarBookingsInput
    createdBy?: UserCreateNestedOneWithoutCreatedCarBookingsInput
    transferFrom?: CarBookingCreateNestedOneWithoutTransferBookingsInput
    transferBookings?: CarBookingCreateNestedManyWithoutTransferFromInput
    transferToAgency?: TravelAgencyCreateNestedOneWithoutTransferredCarBookingsInput
  }

  export type CarBookingUncheckedCreateWithoutUpdatedByInput = {
    id?: string
    bookingCode: string
    travelAgencyId?: string | null
    vehicleType: $Enums.TransportType
    serviceDate: Date | string
    guestName: string
    guestPhone?: string | null
    guestCount?: number
    pickupLocation?: string | null
    dropoffLocation?: string | null
    vat?: boolean
    sellingPrice: Decimal | DecimalJsLike | number | string
    receivingPrice: Decimal | DecimalJsLike | number | string
    debtAmount: Decimal | DecimalJsLike | number | string
    paymentCollection: $Enums.PaymentCollection
    paymentCollectionNote?: string | null
    paymentStatus?: $Enums.PaymentStatus
    paidAt?: Date | string | null
    status?: $Enums.CarBookingStatus
    note?: string | null
    routes?: string | null
    isTransfer?: boolean
    transferFromId?: string | null
    transferToAgencyId?: string | null
    transferReason?: string | null
    transferredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    transferBookings?: CarBookingUncheckedCreateNestedManyWithoutTransferFromInput
  }

  export type CarBookingCreateOrConnectWithoutUpdatedByInput = {
    where: CarBookingWhereUniqueInput
    create: XOR<CarBookingCreateWithoutUpdatedByInput, CarBookingUncheckedCreateWithoutUpdatedByInput>
  }

  export type CarBookingCreateManyUpdatedByInputEnvelope = {
    data: CarBookingCreateManyUpdatedByInput | CarBookingCreateManyUpdatedByInput[]
    skipDuplicates?: boolean
  }

  export type PaymentRecordCreateWithoutCreatedByInput = {
    id?: string
    partnerType: $Enums.PartnerType
    partnerId: string
    debtRecordId?: string | null
    paymentDirection: $Enums.PaymentDirection
    amount: Decimal | DecimalJsLike | number | string
    paymentDate?: Date | string
    paymentMethod?: string | null
    referenceNumber?: string | null
    note?: string | null
    receiptUrl?: string | null
    createdAt?: Date | string
  }

  export type PaymentRecordUncheckedCreateWithoutCreatedByInput = {
    id?: string
    partnerType: $Enums.PartnerType
    partnerId: string
    debtRecordId?: string | null
    paymentDirection: $Enums.PaymentDirection
    amount: Decimal | DecimalJsLike | number | string
    paymentDate?: Date | string
    paymentMethod?: string | null
    referenceNumber?: string | null
    note?: string | null
    receiptUrl?: string | null
    createdAt?: Date | string
  }

  export type PaymentRecordCreateOrConnectWithoutCreatedByInput = {
    where: PaymentRecordWhereUniqueInput
    create: XOR<PaymentRecordCreateWithoutCreatedByInput, PaymentRecordUncheckedCreateWithoutCreatedByInput>
  }

  export type PaymentRecordCreateManyCreatedByInputEnvelope = {
    data: PaymentRecordCreateManyCreatedByInput | PaymentRecordCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type ExpenseCreateWithoutCreatedByInput = {
    id?: string
    title: string
    amount: Decimal | DecimalJsLike | number | string
    category: $Enums.ExpenseCategory
    month: number
    year: number
    note?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: UserCreateNestedOneWithoutUpdatedExpensesInput
  }

  export type ExpenseUncheckedCreateWithoutCreatedByInput = {
    id?: string
    title: string
    amount: Decimal | DecimalJsLike | number | string
    category: $Enums.ExpenseCategory
    month: number
    year: number
    note?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedById?: string | null
  }

  export type ExpenseCreateOrConnectWithoutCreatedByInput = {
    where: ExpenseWhereUniqueInput
    create: XOR<ExpenseCreateWithoutCreatedByInput, ExpenseUncheckedCreateWithoutCreatedByInput>
  }

  export type ExpenseCreateManyCreatedByInputEnvelope = {
    data: ExpenseCreateManyCreatedByInput | ExpenseCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type ExpenseCreateWithoutUpdatedByInput = {
    id?: string
    title: string
    amount: Decimal | DecimalJsLike | number | string
    category: $Enums.ExpenseCategory
    month: number
    year: number
    note?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedExpensesInput
  }

  export type ExpenseUncheckedCreateWithoutUpdatedByInput = {
    id?: string
    title: string
    amount: Decimal | DecimalJsLike | number | string
    category: $Enums.ExpenseCategory
    month: number
    year: number
    note?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
  }

  export type ExpenseCreateOrConnectWithoutUpdatedByInput = {
    where: ExpenseWhereUniqueInput
    create: XOR<ExpenseCreateWithoutUpdatedByInput, ExpenseUncheckedCreateWithoutUpdatedByInput>
  }

  export type ExpenseCreateManyUpdatedByInputEnvelope = {
    data: ExpenseCreateManyUpdatedByInput | ExpenseCreateManyUpdatedByInput[]
    skipDuplicates?: boolean
  }

  export type RefreshTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    update: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    data: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
  }

  export type RefreshTokenUpdateManyWithWhereWithoutUserInput = {
    where: RefreshTokenScalarWhereInput
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type RefreshTokenScalarWhereInput = {
    AND?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    OR?: RefreshTokenScalarWhereInput[]
    NOT?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    id?: UuidFilter<"RefreshToken"> | string
    userId?: UuidFilter<"RefreshToken"> | string
    jti?: StringFilter<"RefreshToken"> | string
    token?: StringFilter<"RefreshToken"> | string
    deviceInfo?: StringNullableFilter<"RefreshToken"> | string | null
    ipAddress?: StringNullableFilter<"RefreshToken"> | string | null
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    isRevoked?: BoolFilter<"RefreshToken"> | boolean
    revokedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    revokedBy?: UuidNullableFilter<"RefreshToken"> | string | null
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    lastUsedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
  }

  export type ActivityLogUpsertWithWhereUniqueWithoutUserInput = {
    where: ActivityLogWhereUniqueInput
    update: XOR<ActivityLogUpdateWithoutUserInput, ActivityLogUncheckedUpdateWithoutUserInput>
    create: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput>
  }

  export type ActivityLogUpdateWithWhereUniqueWithoutUserInput = {
    where: ActivityLogWhereUniqueInput
    data: XOR<ActivityLogUpdateWithoutUserInput, ActivityLogUncheckedUpdateWithoutUserInput>
  }

  export type ActivityLogUpdateManyWithWhereWithoutUserInput = {
    where: ActivityLogScalarWhereInput
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyWithoutUserInput>
  }

  export type ActivityLogScalarWhereInput = {
    AND?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
    OR?: ActivityLogScalarWhereInput[]
    NOT?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
    id?: UuidFilter<"ActivityLog"> | string
    userId?: UuidNullableFilter<"ActivityLog"> | string | null
    action?: EnumActivityActionFilter<"ActivityLog"> | $Enums.ActivityAction
    entityType?: StringFilter<"ActivityLog"> | string
    entityId?: UuidNullableFilter<"ActivityLog"> | string | null
    oldValues?: JsonNullableFilter<"ActivityLog">
    newValues?: JsonNullableFilter<"ActivityLog">
    ipAddress?: StringNullableFilter<"ActivityLog"> | string | null
    userAgent?: StringNullableFilter<"ActivityLog"> | string | null
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
  }

  export type TravelAgencyUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: TravelAgencyWhereUniqueInput
    update: XOR<TravelAgencyUpdateWithoutCreatedByInput, TravelAgencyUncheckedUpdateWithoutCreatedByInput>
    create: XOR<TravelAgencyCreateWithoutCreatedByInput, TravelAgencyUncheckedCreateWithoutCreatedByInput>
  }

  export type TravelAgencyUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: TravelAgencyWhereUniqueInput
    data: XOR<TravelAgencyUpdateWithoutCreatedByInput, TravelAgencyUncheckedUpdateWithoutCreatedByInput>
  }

  export type TravelAgencyUpdateManyWithWhereWithoutCreatedByInput = {
    where: TravelAgencyScalarWhereInput
    data: XOR<TravelAgencyUpdateManyMutationInput, TravelAgencyUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type TravelAgencyScalarWhereInput = {
    AND?: TravelAgencyScalarWhereInput | TravelAgencyScalarWhereInput[]
    OR?: TravelAgencyScalarWhereInput[]
    NOT?: TravelAgencyScalarWhereInput | TravelAgencyScalarWhereInput[]
    id?: UuidFilter<"TravelAgency"> | string
    name?: StringFilter<"TravelAgency"> | string
    tel?: StringNullableFilter<"TravelAgency"> | string | null
    address?: StringNullableFilter<"TravelAgency"> | string | null
    note?: StringNullableFilter<"TravelAgency"> | string | null
    isActive?: BoolFilter<"TravelAgency"> | boolean
    createdAt?: DateTimeFilter<"TravelAgency"> | Date | string
    updatedAt?: DateTimeFilter<"TravelAgency"> | Date | string
    createdById?: UuidNullableFilter<"TravelAgency"> | string | null
    updatedById?: UuidNullableFilter<"TravelAgency"> | string | null
  }

  export type TravelAgencyUpsertWithWhereUniqueWithoutUpdatedByInput = {
    where: TravelAgencyWhereUniqueInput
    update: XOR<TravelAgencyUpdateWithoutUpdatedByInput, TravelAgencyUncheckedUpdateWithoutUpdatedByInput>
    create: XOR<TravelAgencyCreateWithoutUpdatedByInput, TravelAgencyUncheckedCreateWithoutUpdatedByInput>
  }

  export type TravelAgencyUpdateWithWhereUniqueWithoutUpdatedByInput = {
    where: TravelAgencyWhereUniqueInput
    data: XOR<TravelAgencyUpdateWithoutUpdatedByInput, TravelAgencyUncheckedUpdateWithoutUpdatedByInput>
  }

  export type TravelAgencyUpdateManyWithWhereWithoutUpdatedByInput = {
    where: TravelAgencyScalarWhereInput
    data: XOR<TravelAgencyUpdateManyMutationInput, TravelAgencyUncheckedUpdateManyWithoutUpdatedByInput>
  }

  export type CarBookingUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: CarBookingWhereUniqueInput
    update: XOR<CarBookingUpdateWithoutCreatedByInput, CarBookingUncheckedUpdateWithoutCreatedByInput>
    create: XOR<CarBookingCreateWithoutCreatedByInput, CarBookingUncheckedCreateWithoutCreatedByInput>
  }

  export type CarBookingUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: CarBookingWhereUniqueInput
    data: XOR<CarBookingUpdateWithoutCreatedByInput, CarBookingUncheckedUpdateWithoutCreatedByInput>
  }

  export type CarBookingUpdateManyWithWhereWithoutCreatedByInput = {
    where: CarBookingScalarWhereInput
    data: XOR<CarBookingUpdateManyMutationInput, CarBookingUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type CarBookingScalarWhereInput = {
    AND?: CarBookingScalarWhereInput | CarBookingScalarWhereInput[]
    OR?: CarBookingScalarWhereInput[]
    NOT?: CarBookingScalarWhereInput | CarBookingScalarWhereInput[]
    id?: UuidFilter<"CarBooking"> | string
    bookingCode?: StringFilter<"CarBooking"> | string
    travelAgencyId?: UuidNullableFilter<"CarBooking"> | string | null
    vehicleType?: EnumTransportTypeFilter<"CarBooking"> | $Enums.TransportType
    serviceDate?: DateTimeFilter<"CarBooking"> | Date | string
    guestName?: StringFilter<"CarBooking"> | string
    guestPhone?: StringNullableFilter<"CarBooking"> | string | null
    guestCount?: IntFilter<"CarBooking"> | number
    pickupLocation?: StringNullableFilter<"CarBooking"> | string | null
    dropoffLocation?: StringNullableFilter<"CarBooking"> | string | null
    vat?: BoolFilter<"CarBooking"> | boolean
    sellingPrice?: DecimalFilter<"CarBooking"> | Decimal | DecimalJsLike | number | string
    receivingPrice?: DecimalFilter<"CarBooking"> | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFilter<"CarBooking"> | Decimal | DecimalJsLike | number | string
    paymentCollection?: EnumPaymentCollectionFilter<"CarBooking"> | $Enums.PaymentCollection
    paymentCollectionNote?: StringNullableFilter<"CarBooking"> | string | null
    paymentStatus?: EnumPaymentStatusFilter<"CarBooking"> | $Enums.PaymentStatus
    paidAt?: DateTimeNullableFilter<"CarBooking"> | Date | string | null
    status?: EnumCarBookingStatusFilter<"CarBooking"> | $Enums.CarBookingStatus
    note?: StringNullableFilter<"CarBooking"> | string | null
    routes?: StringNullableFilter<"CarBooking"> | string | null
    isTransfer?: BoolFilter<"CarBooking"> | boolean
    transferFromId?: UuidNullableFilter<"CarBooking"> | string | null
    transferToAgencyId?: UuidNullableFilter<"CarBooking"> | string | null
    transferReason?: StringNullableFilter<"CarBooking"> | string | null
    transferredAt?: DateTimeNullableFilter<"CarBooking"> | Date | string | null
    createdAt?: DateTimeFilter<"CarBooking"> | Date | string
    updatedAt?: DateTimeFilter<"CarBooking"> | Date | string
    createdById?: UuidNullableFilter<"CarBooking"> | string | null
    updatedById?: UuidNullableFilter<"CarBooking"> | string | null
  }

  export type CarBookingUpsertWithWhereUniqueWithoutUpdatedByInput = {
    where: CarBookingWhereUniqueInput
    update: XOR<CarBookingUpdateWithoutUpdatedByInput, CarBookingUncheckedUpdateWithoutUpdatedByInput>
    create: XOR<CarBookingCreateWithoutUpdatedByInput, CarBookingUncheckedCreateWithoutUpdatedByInput>
  }

  export type CarBookingUpdateWithWhereUniqueWithoutUpdatedByInput = {
    where: CarBookingWhereUniqueInput
    data: XOR<CarBookingUpdateWithoutUpdatedByInput, CarBookingUncheckedUpdateWithoutUpdatedByInput>
  }

  export type CarBookingUpdateManyWithWhereWithoutUpdatedByInput = {
    where: CarBookingScalarWhereInput
    data: XOR<CarBookingUpdateManyMutationInput, CarBookingUncheckedUpdateManyWithoutUpdatedByInput>
  }

  export type PaymentRecordUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: PaymentRecordWhereUniqueInput
    update: XOR<PaymentRecordUpdateWithoutCreatedByInput, PaymentRecordUncheckedUpdateWithoutCreatedByInput>
    create: XOR<PaymentRecordCreateWithoutCreatedByInput, PaymentRecordUncheckedCreateWithoutCreatedByInput>
  }

  export type PaymentRecordUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: PaymentRecordWhereUniqueInput
    data: XOR<PaymentRecordUpdateWithoutCreatedByInput, PaymentRecordUncheckedUpdateWithoutCreatedByInput>
  }

  export type PaymentRecordUpdateManyWithWhereWithoutCreatedByInput = {
    where: PaymentRecordScalarWhereInput
    data: XOR<PaymentRecordUpdateManyMutationInput, PaymentRecordUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type PaymentRecordScalarWhereInput = {
    AND?: PaymentRecordScalarWhereInput | PaymentRecordScalarWhereInput[]
    OR?: PaymentRecordScalarWhereInput[]
    NOT?: PaymentRecordScalarWhereInput | PaymentRecordScalarWhereInput[]
    id?: UuidFilter<"PaymentRecord"> | string
    partnerType?: EnumPartnerTypeFilter<"PaymentRecord"> | $Enums.PartnerType
    partnerId?: UuidFilter<"PaymentRecord"> | string
    debtRecordId?: UuidNullableFilter<"PaymentRecord"> | string | null
    paymentDirection?: EnumPaymentDirectionFilter<"PaymentRecord"> | $Enums.PaymentDirection
    amount?: DecimalFilter<"PaymentRecord"> | Decimal | DecimalJsLike | number | string
    paymentDate?: DateTimeFilter<"PaymentRecord"> | Date | string
    paymentMethod?: StringNullableFilter<"PaymentRecord"> | string | null
    referenceNumber?: StringNullableFilter<"PaymentRecord"> | string | null
    note?: StringNullableFilter<"PaymentRecord"> | string | null
    receiptUrl?: StringNullableFilter<"PaymentRecord"> | string | null
    createdAt?: DateTimeFilter<"PaymentRecord"> | Date | string
    createdById?: UuidNullableFilter<"PaymentRecord"> | string | null
  }

  export type ExpenseUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: ExpenseWhereUniqueInput
    update: XOR<ExpenseUpdateWithoutCreatedByInput, ExpenseUncheckedUpdateWithoutCreatedByInput>
    create: XOR<ExpenseCreateWithoutCreatedByInput, ExpenseUncheckedCreateWithoutCreatedByInput>
  }

  export type ExpenseUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: ExpenseWhereUniqueInput
    data: XOR<ExpenseUpdateWithoutCreatedByInput, ExpenseUncheckedUpdateWithoutCreatedByInput>
  }

  export type ExpenseUpdateManyWithWhereWithoutCreatedByInput = {
    where: ExpenseScalarWhereInput
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type ExpenseScalarWhereInput = {
    AND?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
    OR?: ExpenseScalarWhereInput[]
    NOT?: ExpenseScalarWhereInput | ExpenseScalarWhereInput[]
    id?: UuidFilter<"Expense"> | string
    title?: StringFilter<"Expense"> | string
    amount?: DecimalFilter<"Expense"> | Decimal | DecimalJsLike | number | string
    category?: EnumExpenseCategoryFilter<"Expense"> | $Enums.ExpenseCategory
    month?: IntFilter<"Expense"> | number
    year?: IntFilter<"Expense"> | number
    note?: StringNullableFilter<"Expense"> | string | null
    isActive?: BoolFilter<"Expense"> | boolean
    createdAt?: DateTimeFilter<"Expense"> | Date | string
    updatedAt?: DateTimeFilter<"Expense"> | Date | string
    createdById?: UuidNullableFilter<"Expense"> | string | null
    updatedById?: UuidNullableFilter<"Expense"> | string | null
  }

  export type ExpenseUpsertWithWhereUniqueWithoutUpdatedByInput = {
    where: ExpenseWhereUniqueInput
    update: XOR<ExpenseUpdateWithoutUpdatedByInput, ExpenseUncheckedUpdateWithoutUpdatedByInput>
    create: XOR<ExpenseCreateWithoutUpdatedByInput, ExpenseUncheckedCreateWithoutUpdatedByInput>
  }

  export type ExpenseUpdateWithWhereUniqueWithoutUpdatedByInput = {
    where: ExpenseWhereUniqueInput
    data: XOR<ExpenseUpdateWithoutUpdatedByInput, ExpenseUncheckedUpdateWithoutUpdatedByInput>
  }

  export type ExpenseUpdateManyWithWhereWithoutUpdatedByInput = {
    where: ExpenseScalarWhereInput
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyWithoutUpdatedByInput>
  }

  export type UserCreateWithoutRefreshTokensInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    tel?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    emailVerified?: boolean
    mustChangePassword?: boolean
    emailVerificationToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    activityLogs?: ActivityLogCreateNestedManyWithoutUserInput
    createdTravelAgencies?: TravelAgencyCreateNestedManyWithoutCreatedByInput
    updatedTravelAgencies?: TravelAgencyCreateNestedManyWithoutUpdatedByInput
    createdCarBookings?: CarBookingCreateNestedManyWithoutCreatedByInput
    updatedCarBookings?: CarBookingCreateNestedManyWithoutUpdatedByInput
    createdPaymentRecords?: PaymentRecordCreateNestedManyWithoutCreatedByInput
    createdExpenses?: ExpenseCreateNestedManyWithoutCreatedByInput
    updatedExpenses?: ExpenseCreateNestedManyWithoutUpdatedByInput
  }

  export type UserUncheckedCreateWithoutRefreshTokensInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    tel?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    emailVerified?: boolean
    mustChangePassword?: boolean
    emailVerificationToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
    createdTravelAgencies?: TravelAgencyUncheckedCreateNestedManyWithoutCreatedByInput
    updatedTravelAgencies?: TravelAgencyUncheckedCreateNestedManyWithoutUpdatedByInput
    createdCarBookings?: CarBookingUncheckedCreateNestedManyWithoutCreatedByInput
    updatedCarBookings?: CarBookingUncheckedCreateNestedManyWithoutUpdatedByInput
    createdPaymentRecords?: PaymentRecordUncheckedCreateNestedManyWithoutCreatedByInput
    createdExpenses?: ExpenseUncheckedCreateNestedManyWithoutCreatedByInput
    updatedExpenses?: ExpenseUncheckedCreateNestedManyWithoutUpdatedByInput
  }

  export type UserCreateOrConnectWithoutRefreshTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
  }

  export type UserUpsertWithoutRefreshTokensInput = {
    update: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRefreshTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type UserUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activityLogs?: ActivityLogUpdateManyWithoutUserNestedInput
    createdTravelAgencies?: TravelAgencyUpdateManyWithoutCreatedByNestedInput
    updatedTravelAgencies?: TravelAgencyUpdateManyWithoutUpdatedByNestedInput
    createdCarBookings?: CarBookingUpdateManyWithoutCreatedByNestedInput
    updatedCarBookings?: CarBookingUpdateManyWithoutUpdatedByNestedInput
    createdPaymentRecords?: PaymentRecordUpdateManyWithoutCreatedByNestedInput
    createdExpenses?: ExpenseUpdateManyWithoutCreatedByNestedInput
    updatedExpenses?: ExpenseUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
    createdTravelAgencies?: TravelAgencyUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedTravelAgencies?: TravelAgencyUncheckedUpdateManyWithoutUpdatedByNestedInput
    createdCarBookings?: CarBookingUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedCarBookings?: CarBookingUncheckedUpdateManyWithoutUpdatedByNestedInput
    createdPaymentRecords?: PaymentRecordUncheckedUpdateManyWithoutCreatedByNestedInput
    createdExpenses?: ExpenseUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedExpenses?: ExpenseUncheckedUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserCreateWithoutCreatedTravelAgenciesInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    tel?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    emailVerified?: boolean
    mustChangePassword?: boolean
    emailVerificationToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogCreateNestedManyWithoutUserInput
    updatedTravelAgencies?: TravelAgencyCreateNestedManyWithoutUpdatedByInput
    createdCarBookings?: CarBookingCreateNestedManyWithoutCreatedByInput
    updatedCarBookings?: CarBookingCreateNestedManyWithoutUpdatedByInput
    createdPaymentRecords?: PaymentRecordCreateNestedManyWithoutCreatedByInput
    createdExpenses?: ExpenseCreateNestedManyWithoutCreatedByInput
    updatedExpenses?: ExpenseCreateNestedManyWithoutUpdatedByInput
  }

  export type UserUncheckedCreateWithoutCreatedTravelAgenciesInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    tel?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    emailVerified?: boolean
    mustChangePassword?: boolean
    emailVerificationToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
    updatedTravelAgencies?: TravelAgencyUncheckedCreateNestedManyWithoutUpdatedByInput
    createdCarBookings?: CarBookingUncheckedCreateNestedManyWithoutCreatedByInput
    updatedCarBookings?: CarBookingUncheckedCreateNestedManyWithoutUpdatedByInput
    createdPaymentRecords?: PaymentRecordUncheckedCreateNestedManyWithoutCreatedByInput
    createdExpenses?: ExpenseUncheckedCreateNestedManyWithoutCreatedByInput
    updatedExpenses?: ExpenseUncheckedCreateNestedManyWithoutUpdatedByInput
  }

  export type UserCreateOrConnectWithoutCreatedTravelAgenciesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedTravelAgenciesInput, UserUncheckedCreateWithoutCreatedTravelAgenciesInput>
  }

  export type UserCreateWithoutUpdatedTravelAgenciesInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    tel?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    emailVerified?: boolean
    mustChangePassword?: boolean
    emailVerificationToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogCreateNestedManyWithoutUserInput
    createdTravelAgencies?: TravelAgencyCreateNestedManyWithoutCreatedByInput
    createdCarBookings?: CarBookingCreateNestedManyWithoutCreatedByInput
    updatedCarBookings?: CarBookingCreateNestedManyWithoutUpdatedByInput
    createdPaymentRecords?: PaymentRecordCreateNestedManyWithoutCreatedByInput
    createdExpenses?: ExpenseCreateNestedManyWithoutCreatedByInput
    updatedExpenses?: ExpenseCreateNestedManyWithoutUpdatedByInput
  }

  export type UserUncheckedCreateWithoutUpdatedTravelAgenciesInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    tel?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    emailVerified?: boolean
    mustChangePassword?: boolean
    emailVerificationToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
    createdTravelAgencies?: TravelAgencyUncheckedCreateNestedManyWithoutCreatedByInput
    createdCarBookings?: CarBookingUncheckedCreateNestedManyWithoutCreatedByInput
    updatedCarBookings?: CarBookingUncheckedCreateNestedManyWithoutUpdatedByInput
    createdPaymentRecords?: PaymentRecordUncheckedCreateNestedManyWithoutCreatedByInput
    createdExpenses?: ExpenseUncheckedCreateNestedManyWithoutCreatedByInput
    updatedExpenses?: ExpenseUncheckedCreateNestedManyWithoutUpdatedByInput
  }

  export type UserCreateOrConnectWithoutUpdatedTravelAgenciesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUpdatedTravelAgenciesInput, UserUncheckedCreateWithoutUpdatedTravelAgenciesInput>
  }

  export type CarBookingCreateWithoutTravelAgencyInput = {
    id?: string
    bookingCode: string
    vehicleType: $Enums.TransportType
    serviceDate: Date | string
    guestName: string
    guestPhone?: string | null
    guestCount?: number
    pickupLocation?: string | null
    dropoffLocation?: string | null
    vat?: boolean
    sellingPrice: Decimal | DecimalJsLike | number | string
    receivingPrice: Decimal | DecimalJsLike | number | string
    debtAmount: Decimal | DecimalJsLike | number | string
    paymentCollection: $Enums.PaymentCollection
    paymentCollectionNote?: string | null
    paymentStatus?: $Enums.PaymentStatus
    paidAt?: Date | string | null
    status?: $Enums.CarBookingStatus
    note?: string | null
    routes?: string | null
    isTransfer?: boolean
    transferReason?: string | null
    transferredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedCarBookingsInput
    updatedBy?: UserCreateNestedOneWithoutUpdatedCarBookingsInput
    transferFrom?: CarBookingCreateNestedOneWithoutTransferBookingsInput
    transferBookings?: CarBookingCreateNestedManyWithoutTransferFromInput
    transferToAgency?: TravelAgencyCreateNestedOneWithoutTransferredCarBookingsInput
  }

  export type CarBookingUncheckedCreateWithoutTravelAgencyInput = {
    id?: string
    bookingCode: string
    vehicleType: $Enums.TransportType
    serviceDate: Date | string
    guestName: string
    guestPhone?: string | null
    guestCount?: number
    pickupLocation?: string | null
    dropoffLocation?: string | null
    vat?: boolean
    sellingPrice: Decimal | DecimalJsLike | number | string
    receivingPrice: Decimal | DecimalJsLike | number | string
    debtAmount: Decimal | DecimalJsLike | number | string
    paymentCollection: $Enums.PaymentCollection
    paymentCollectionNote?: string | null
    paymentStatus?: $Enums.PaymentStatus
    paidAt?: Date | string | null
    status?: $Enums.CarBookingStatus
    note?: string | null
    routes?: string | null
    isTransfer?: boolean
    transferFromId?: string | null
    transferToAgencyId?: string | null
    transferReason?: string | null
    transferredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    updatedById?: string | null
    transferBookings?: CarBookingUncheckedCreateNestedManyWithoutTransferFromInput
  }

  export type CarBookingCreateOrConnectWithoutTravelAgencyInput = {
    where: CarBookingWhereUniqueInput
    create: XOR<CarBookingCreateWithoutTravelAgencyInput, CarBookingUncheckedCreateWithoutTravelAgencyInput>
  }

  export type CarBookingCreateManyTravelAgencyInputEnvelope = {
    data: CarBookingCreateManyTravelAgencyInput | CarBookingCreateManyTravelAgencyInput[]
    skipDuplicates?: boolean
  }

  export type CarBookingCreateWithoutTransferToAgencyInput = {
    id?: string
    bookingCode: string
    vehicleType: $Enums.TransportType
    serviceDate: Date | string
    guestName: string
    guestPhone?: string | null
    guestCount?: number
    pickupLocation?: string | null
    dropoffLocation?: string | null
    vat?: boolean
    sellingPrice: Decimal | DecimalJsLike | number | string
    receivingPrice: Decimal | DecimalJsLike | number | string
    debtAmount: Decimal | DecimalJsLike | number | string
    paymentCollection: $Enums.PaymentCollection
    paymentCollectionNote?: string | null
    paymentStatus?: $Enums.PaymentStatus
    paidAt?: Date | string | null
    status?: $Enums.CarBookingStatus
    note?: string | null
    routes?: string | null
    isTransfer?: boolean
    transferReason?: string | null
    transferredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    travelAgency?: TravelAgencyCreateNestedOneWithoutCarBookingsInput
    createdBy?: UserCreateNestedOneWithoutCreatedCarBookingsInput
    updatedBy?: UserCreateNestedOneWithoutUpdatedCarBookingsInput
    transferFrom?: CarBookingCreateNestedOneWithoutTransferBookingsInput
    transferBookings?: CarBookingCreateNestedManyWithoutTransferFromInput
  }

  export type CarBookingUncheckedCreateWithoutTransferToAgencyInput = {
    id?: string
    bookingCode: string
    travelAgencyId?: string | null
    vehicleType: $Enums.TransportType
    serviceDate: Date | string
    guestName: string
    guestPhone?: string | null
    guestCount?: number
    pickupLocation?: string | null
    dropoffLocation?: string | null
    vat?: boolean
    sellingPrice: Decimal | DecimalJsLike | number | string
    receivingPrice: Decimal | DecimalJsLike | number | string
    debtAmount: Decimal | DecimalJsLike | number | string
    paymentCollection: $Enums.PaymentCollection
    paymentCollectionNote?: string | null
    paymentStatus?: $Enums.PaymentStatus
    paidAt?: Date | string | null
    status?: $Enums.CarBookingStatus
    note?: string | null
    routes?: string | null
    isTransfer?: boolean
    transferFromId?: string | null
    transferReason?: string | null
    transferredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    updatedById?: string | null
    transferBookings?: CarBookingUncheckedCreateNestedManyWithoutTransferFromInput
  }

  export type CarBookingCreateOrConnectWithoutTransferToAgencyInput = {
    where: CarBookingWhereUniqueInput
    create: XOR<CarBookingCreateWithoutTransferToAgencyInput, CarBookingUncheckedCreateWithoutTransferToAgencyInput>
  }

  export type CarBookingCreateManyTransferToAgencyInputEnvelope = {
    data: CarBookingCreateManyTransferToAgencyInput | CarBookingCreateManyTransferToAgencyInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCreatedTravelAgenciesInput = {
    update: XOR<UserUpdateWithoutCreatedTravelAgenciesInput, UserUncheckedUpdateWithoutCreatedTravelAgenciesInput>
    create: XOR<UserCreateWithoutCreatedTravelAgenciesInput, UserUncheckedCreateWithoutCreatedTravelAgenciesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedTravelAgenciesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedTravelAgenciesInput, UserUncheckedUpdateWithoutCreatedTravelAgenciesInput>
  }

  export type UserUpdateWithoutCreatedTravelAgenciesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutUserNestedInput
    updatedTravelAgencies?: TravelAgencyUpdateManyWithoutUpdatedByNestedInput
    createdCarBookings?: CarBookingUpdateManyWithoutCreatedByNestedInput
    updatedCarBookings?: CarBookingUpdateManyWithoutUpdatedByNestedInput
    createdPaymentRecords?: PaymentRecordUpdateManyWithoutCreatedByNestedInput
    createdExpenses?: ExpenseUpdateManyWithoutCreatedByNestedInput
    updatedExpenses?: ExpenseUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedTravelAgenciesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
    updatedTravelAgencies?: TravelAgencyUncheckedUpdateManyWithoutUpdatedByNestedInput
    createdCarBookings?: CarBookingUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedCarBookings?: CarBookingUncheckedUpdateManyWithoutUpdatedByNestedInput
    createdPaymentRecords?: PaymentRecordUncheckedUpdateManyWithoutCreatedByNestedInput
    createdExpenses?: ExpenseUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedExpenses?: ExpenseUncheckedUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUpsertWithoutUpdatedTravelAgenciesInput = {
    update: XOR<UserUpdateWithoutUpdatedTravelAgenciesInput, UserUncheckedUpdateWithoutUpdatedTravelAgenciesInput>
    create: XOR<UserCreateWithoutUpdatedTravelAgenciesInput, UserUncheckedCreateWithoutUpdatedTravelAgenciesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUpdatedTravelAgenciesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUpdatedTravelAgenciesInput, UserUncheckedUpdateWithoutUpdatedTravelAgenciesInput>
  }

  export type UserUpdateWithoutUpdatedTravelAgenciesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutUserNestedInput
    createdTravelAgencies?: TravelAgencyUpdateManyWithoutCreatedByNestedInput
    createdCarBookings?: CarBookingUpdateManyWithoutCreatedByNestedInput
    updatedCarBookings?: CarBookingUpdateManyWithoutUpdatedByNestedInput
    createdPaymentRecords?: PaymentRecordUpdateManyWithoutCreatedByNestedInput
    createdExpenses?: ExpenseUpdateManyWithoutCreatedByNestedInput
    updatedExpenses?: ExpenseUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutUpdatedTravelAgenciesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
    createdTravelAgencies?: TravelAgencyUncheckedUpdateManyWithoutCreatedByNestedInput
    createdCarBookings?: CarBookingUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedCarBookings?: CarBookingUncheckedUpdateManyWithoutUpdatedByNestedInput
    createdPaymentRecords?: PaymentRecordUncheckedUpdateManyWithoutCreatedByNestedInput
    createdExpenses?: ExpenseUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedExpenses?: ExpenseUncheckedUpdateManyWithoutUpdatedByNestedInput
  }

  export type CarBookingUpsertWithWhereUniqueWithoutTravelAgencyInput = {
    where: CarBookingWhereUniqueInput
    update: XOR<CarBookingUpdateWithoutTravelAgencyInput, CarBookingUncheckedUpdateWithoutTravelAgencyInput>
    create: XOR<CarBookingCreateWithoutTravelAgencyInput, CarBookingUncheckedCreateWithoutTravelAgencyInput>
  }

  export type CarBookingUpdateWithWhereUniqueWithoutTravelAgencyInput = {
    where: CarBookingWhereUniqueInput
    data: XOR<CarBookingUpdateWithoutTravelAgencyInput, CarBookingUncheckedUpdateWithoutTravelAgencyInput>
  }

  export type CarBookingUpdateManyWithWhereWithoutTravelAgencyInput = {
    where: CarBookingScalarWhereInput
    data: XOR<CarBookingUpdateManyMutationInput, CarBookingUncheckedUpdateManyWithoutTravelAgencyInput>
  }

  export type CarBookingUpsertWithWhereUniqueWithoutTransferToAgencyInput = {
    where: CarBookingWhereUniqueInput
    update: XOR<CarBookingUpdateWithoutTransferToAgencyInput, CarBookingUncheckedUpdateWithoutTransferToAgencyInput>
    create: XOR<CarBookingCreateWithoutTransferToAgencyInput, CarBookingUncheckedCreateWithoutTransferToAgencyInput>
  }

  export type CarBookingUpdateWithWhereUniqueWithoutTransferToAgencyInput = {
    where: CarBookingWhereUniqueInput
    data: XOR<CarBookingUpdateWithoutTransferToAgencyInput, CarBookingUncheckedUpdateWithoutTransferToAgencyInput>
  }

  export type CarBookingUpdateManyWithWhereWithoutTransferToAgencyInput = {
    where: CarBookingScalarWhereInput
    data: XOR<CarBookingUpdateManyMutationInput, CarBookingUncheckedUpdateManyWithoutTransferToAgencyInput>
  }

  export type TravelAgencyCreateWithoutCarBookingsInput = {
    id?: string
    name: string
    tel?: string | null
    address?: string | null
    note?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedTravelAgenciesInput
    updatedBy?: UserCreateNestedOneWithoutUpdatedTravelAgenciesInput
    transferredCarBookings?: CarBookingCreateNestedManyWithoutTransferToAgencyInput
  }

  export type TravelAgencyUncheckedCreateWithoutCarBookingsInput = {
    id?: string
    name: string
    tel?: string | null
    address?: string | null
    note?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    updatedById?: string | null
    transferredCarBookings?: CarBookingUncheckedCreateNestedManyWithoutTransferToAgencyInput
  }

  export type TravelAgencyCreateOrConnectWithoutCarBookingsInput = {
    where: TravelAgencyWhereUniqueInput
    create: XOR<TravelAgencyCreateWithoutCarBookingsInput, TravelAgencyUncheckedCreateWithoutCarBookingsInput>
  }

  export type UserCreateWithoutCreatedCarBookingsInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    tel?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    emailVerified?: boolean
    mustChangePassword?: boolean
    emailVerificationToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogCreateNestedManyWithoutUserInput
    createdTravelAgencies?: TravelAgencyCreateNestedManyWithoutCreatedByInput
    updatedTravelAgencies?: TravelAgencyCreateNestedManyWithoutUpdatedByInput
    updatedCarBookings?: CarBookingCreateNestedManyWithoutUpdatedByInput
    createdPaymentRecords?: PaymentRecordCreateNestedManyWithoutCreatedByInput
    createdExpenses?: ExpenseCreateNestedManyWithoutCreatedByInput
    updatedExpenses?: ExpenseCreateNestedManyWithoutUpdatedByInput
  }

  export type UserUncheckedCreateWithoutCreatedCarBookingsInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    tel?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    emailVerified?: boolean
    mustChangePassword?: boolean
    emailVerificationToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
    createdTravelAgencies?: TravelAgencyUncheckedCreateNestedManyWithoutCreatedByInput
    updatedTravelAgencies?: TravelAgencyUncheckedCreateNestedManyWithoutUpdatedByInput
    updatedCarBookings?: CarBookingUncheckedCreateNestedManyWithoutUpdatedByInput
    createdPaymentRecords?: PaymentRecordUncheckedCreateNestedManyWithoutCreatedByInput
    createdExpenses?: ExpenseUncheckedCreateNestedManyWithoutCreatedByInput
    updatedExpenses?: ExpenseUncheckedCreateNestedManyWithoutUpdatedByInput
  }

  export type UserCreateOrConnectWithoutCreatedCarBookingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedCarBookingsInput, UserUncheckedCreateWithoutCreatedCarBookingsInput>
  }

  export type UserCreateWithoutUpdatedCarBookingsInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    tel?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    emailVerified?: boolean
    mustChangePassword?: boolean
    emailVerificationToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogCreateNestedManyWithoutUserInput
    createdTravelAgencies?: TravelAgencyCreateNestedManyWithoutCreatedByInput
    updatedTravelAgencies?: TravelAgencyCreateNestedManyWithoutUpdatedByInput
    createdCarBookings?: CarBookingCreateNestedManyWithoutCreatedByInput
    createdPaymentRecords?: PaymentRecordCreateNestedManyWithoutCreatedByInput
    createdExpenses?: ExpenseCreateNestedManyWithoutCreatedByInput
    updatedExpenses?: ExpenseCreateNestedManyWithoutUpdatedByInput
  }

  export type UserUncheckedCreateWithoutUpdatedCarBookingsInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    tel?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    emailVerified?: boolean
    mustChangePassword?: boolean
    emailVerificationToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
    createdTravelAgencies?: TravelAgencyUncheckedCreateNestedManyWithoutCreatedByInput
    updatedTravelAgencies?: TravelAgencyUncheckedCreateNestedManyWithoutUpdatedByInput
    createdCarBookings?: CarBookingUncheckedCreateNestedManyWithoutCreatedByInput
    createdPaymentRecords?: PaymentRecordUncheckedCreateNestedManyWithoutCreatedByInput
    createdExpenses?: ExpenseUncheckedCreateNestedManyWithoutCreatedByInput
    updatedExpenses?: ExpenseUncheckedCreateNestedManyWithoutUpdatedByInput
  }

  export type UserCreateOrConnectWithoutUpdatedCarBookingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUpdatedCarBookingsInput, UserUncheckedCreateWithoutUpdatedCarBookingsInput>
  }

  export type CarBookingCreateWithoutTransferBookingsInput = {
    id?: string
    bookingCode: string
    vehicleType: $Enums.TransportType
    serviceDate: Date | string
    guestName: string
    guestPhone?: string | null
    guestCount?: number
    pickupLocation?: string | null
    dropoffLocation?: string | null
    vat?: boolean
    sellingPrice: Decimal | DecimalJsLike | number | string
    receivingPrice: Decimal | DecimalJsLike | number | string
    debtAmount: Decimal | DecimalJsLike | number | string
    paymentCollection: $Enums.PaymentCollection
    paymentCollectionNote?: string | null
    paymentStatus?: $Enums.PaymentStatus
    paidAt?: Date | string | null
    status?: $Enums.CarBookingStatus
    note?: string | null
    routes?: string | null
    isTransfer?: boolean
    transferReason?: string | null
    transferredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    travelAgency?: TravelAgencyCreateNestedOneWithoutCarBookingsInput
    createdBy?: UserCreateNestedOneWithoutCreatedCarBookingsInput
    updatedBy?: UserCreateNestedOneWithoutUpdatedCarBookingsInput
    transferFrom?: CarBookingCreateNestedOneWithoutTransferBookingsInput
    transferToAgency?: TravelAgencyCreateNestedOneWithoutTransferredCarBookingsInput
  }

  export type CarBookingUncheckedCreateWithoutTransferBookingsInput = {
    id?: string
    bookingCode: string
    travelAgencyId?: string | null
    vehicleType: $Enums.TransportType
    serviceDate: Date | string
    guestName: string
    guestPhone?: string | null
    guestCount?: number
    pickupLocation?: string | null
    dropoffLocation?: string | null
    vat?: boolean
    sellingPrice: Decimal | DecimalJsLike | number | string
    receivingPrice: Decimal | DecimalJsLike | number | string
    debtAmount: Decimal | DecimalJsLike | number | string
    paymentCollection: $Enums.PaymentCollection
    paymentCollectionNote?: string | null
    paymentStatus?: $Enums.PaymentStatus
    paidAt?: Date | string | null
    status?: $Enums.CarBookingStatus
    note?: string | null
    routes?: string | null
    isTransfer?: boolean
    transferFromId?: string | null
    transferToAgencyId?: string | null
    transferReason?: string | null
    transferredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    updatedById?: string | null
  }

  export type CarBookingCreateOrConnectWithoutTransferBookingsInput = {
    where: CarBookingWhereUniqueInput
    create: XOR<CarBookingCreateWithoutTransferBookingsInput, CarBookingUncheckedCreateWithoutTransferBookingsInput>
  }

  export type CarBookingCreateWithoutTransferFromInput = {
    id?: string
    bookingCode: string
    vehicleType: $Enums.TransportType
    serviceDate: Date | string
    guestName: string
    guestPhone?: string | null
    guestCount?: number
    pickupLocation?: string | null
    dropoffLocation?: string | null
    vat?: boolean
    sellingPrice: Decimal | DecimalJsLike | number | string
    receivingPrice: Decimal | DecimalJsLike | number | string
    debtAmount: Decimal | DecimalJsLike | number | string
    paymentCollection: $Enums.PaymentCollection
    paymentCollectionNote?: string | null
    paymentStatus?: $Enums.PaymentStatus
    paidAt?: Date | string | null
    status?: $Enums.CarBookingStatus
    note?: string | null
    routes?: string | null
    isTransfer?: boolean
    transferReason?: string | null
    transferredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    travelAgency?: TravelAgencyCreateNestedOneWithoutCarBookingsInput
    createdBy?: UserCreateNestedOneWithoutCreatedCarBookingsInput
    updatedBy?: UserCreateNestedOneWithoutUpdatedCarBookingsInput
    transferBookings?: CarBookingCreateNestedManyWithoutTransferFromInput
    transferToAgency?: TravelAgencyCreateNestedOneWithoutTransferredCarBookingsInput
  }

  export type CarBookingUncheckedCreateWithoutTransferFromInput = {
    id?: string
    bookingCode: string
    travelAgencyId?: string | null
    vehicleType: $Enums.TransportType
    serviceDate: Date | string
    guestName: string
    guestPhone?: string | null
    guestCount?: number
    pickupLocation?: string | null
    dropoffLocation?: string | null
    vat?: boolean
    sellingPrice: Decimal | DecimalJsLike | number | string
    receivingPrice: Decimal | DecimalJsLike | number | string
    debtAmount: Decimal | DecimalJsLike | number | string
    paymentCollection: $Enums.PaymentCollection
    paymentCollectionNote?: string | null
    paymentStatus?: $Enums.PaymentStatus
    paidAt?: Date | string | null
    status?: $Enums.CarBookingStatus
    note?: string | null
    routes?: string | null
    isTransfer?: boolean
    transferToAgencyId?: string | null
    transferReason?: string | null
    transferredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    updatedById?: string | null
    transferBookings?: CarBookingUncheckedCreateNestedManyWithoutTransferFromInput
  }

  export type CarBookingCreateOrConnectWithoutTransferFromInput = {
    where: CarBookingWhereUniqueInput
    create: XOR<CarBookingCreateWithoutTransferFromInput, CarBookingUncheckedCreateWithoutTransferFromInput>
  }

  export type CarBookingCreateManyTransferFromInputEnvelope = {
    data: CarBookingCreateManyTransferFromInput | CarBookingCreateManyTransferFromInput[]
    skipDuplicates?: boolean
  }

  export type TravelAgencyCreateWithoutTransferredCarBookingsInput = {
    id?: string
    name: string
    tel?: string | null
    address?: string | null
    note?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedTravelAgenciesInput
    updatedBy?: UserCreateNestedOneWithoutUpdatedTravelAgenciesInput
    carBookings?: CarBookingCreateNestedManyWithoutTravelAgencyInput
  }

  export type TravelAgencyUncheckedCreateWithoutTransferredCarBookingsInput = {
    id?: string
    name: string
    tel?: string | null
    address?: string | null
    note?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    updatedById?: string | null
    carBookings?: CarBookingUncheckedCreateNestedManyWithoutTravelAgencyInput
  }

  export type TravelAgencyCreateOrConnectWithoutTransferredCarBookingsInput = {
    where: TravelAgencyWhereUniqueInput
    create: XOR<TravelAgencyCreateWithoutTransferredCarBookingsInput, TravelAgencyUncheckedCreateWithoutTransferredCarBookingsInput>
  }

  export type TravelAgencyUpsertWithoutCarBookingsInput = {
    update: XOR<TravelAgencyUpdateWithoutCarBookingsInput, TravelAgencyUncheckedUpdateWithoutCarBookingsInput>
    create: XOR<TravelAgencyCreateWithoutCarBookingsInput, TravelAgencyUncheckedCreateWithoutCarBookingsInput>
    where?: TravelAgencyWhereInput
  }

  export type TravelAgencyUpdateToOneWithWhereWithoutCarBookingsInput = {
    where?: TravelAgencyWhereInput
    data: XOR<TravelAgencyUpdateWithoutCarBookingsInput, TravelAgencyUncheckedUpdateWithoutCarBookingsInput>
  }

  export type TravelAgencyUpdateWithoutCarBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedTravelAgenciesNestedInput
    updatedBy?: UserUpdateOneWithoutUpdatedTravelAgenciesNestedInput
    transferredCarBookings?: CarBookingUpdateManyWithoutTransferToAgencyNestedInput
  }

  export type TravelAgencyUncheckedUpdateWithoutCarBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    transferredCarBookings?: CarBookingUncheckedUpdateManyWithoutTransferToAgencyNestedInput
  }

  export type UserUpsertWithoutCreatedCarBookingsInput = {
    update: XOR<UserUpdateWithoutCreatedCarBookingsInput, UserUncheckedUpdateWithoutCreatedCarBookingsInput>
    create: XOR<UserCreateWithoutCreatedCarBookingsInput, UserUncheckedCreateWithoutCreatedCarBookingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedCarBookingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedCarBookingsInput, UserUncheckedUpdateWithoutCreatedCarBookingsInput>
  }

  export type UserUpdateWithoutCreatedCarBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutUserNestedInput
    createdTravelAgencies?: TravelAgencyUpdateManyWithoutCreatedByNestedInput
    updatedTravelAgencies?: TravelAgencyUpdateManyWithoutUpdatedByNestedInput
    updatedCarBookings?: CarBookingUpdateManyWithoutUpdatedByNestedInput
    createdPaymentRecords?: PaymentRecordUpdateManyWithoutCreatedByNestedInput
    createdExpenses?: ExpenseUpdateManyWithoutCreatedByNestedInput
    updatedExpenses?: ExpenseUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedCarBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
    createdTravelAgencies?: TravelAgencyUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedTravelAgencies?: TravelAgencyUncheckedUpdateManyWithoutUpdatedByNestedInput
    updatedCarBookings?: CarBookingUncheckedUpdateManyWithoutUpdatedByNestedInput
    createdPaymentRecords?: PaymentRecordUncheckedUpdateManyWithoutCreatedByNestedInput
    createdExpenses?: ExpenseUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedExpenses?: ExpenseUncheckedUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUpsertWithoutUpdatedCarBookingsInput = {
    update: XOR<UserUpdateWithoutUpdatedCarBookingsInput, UserUncheckedUpdateWithoutUpdatedCarBookingsInput>
    create: XOR<UserCreateWithoutUpdatedCarBookingsInput, UserUncheckedCreateWithoutUpdatedCarBookingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUpdatedCarBookingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUpdatedCarBookingsInput, UserUncheckedUpdateWithoutUpdatedCarBookingsInput>
  }

  export type UserUpdateWithoutUpdatedCarBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutUserNestedInput
    createdTravelAgencies?: TravelAgencyUpdateManyWithoutCreatedByNestedInput
    updatedTravelAgencies?: TravelAgencyUpdateManyWithoutUpdatedByNestedInput
    createdCarBookings?: CarBookingUpdateManyWithoutCreatedByNestedInput
    createdPaymentRecords?: PaymentRecordUpdateManyWithoutCreatedByNestedInput
    createdExpenses?: ExpenseUpdateManyWithoutCreatedByNestedInput
    updatedExpenses?: ExpenseUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutUpdatedCarBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
    createdTravelAgencies?: TravelAgencyUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedTravelAgencies?: TravelAgencyUncheckedUpdateManyWithoutUpdatedByNestedInput
    createdCarBookings?: CarBookingUncheckedUpdateManyWithoutCreatedByNestedInput
    createdPaymentRecords?: PaymentRecordUncheckedUpdateManyWithoutCreatedByNestedInput
    createdExpenses?: ExpenseUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedExpenses?: ExpenseUncheckedUpdateManyWithoutUpdatedByNestedInput
  }

  export type CarBookingUpsertWithoutTransferBookingsInput = {
    update: XOR<CarBookingUpdateWithoutTransferBookingsInput, CarBookingUncheckedUpdateWithoutTransferBookingsInput>
    create: XOR<CarBookingCreateWithoutTransferBookingsInput, CarBookingUncheckedCreateWithoutTransferBookingsInput>
    where?: CarBookingWhereInput
  }

  export type CarBookingUpdateToOneWithWhereWithoutTransferBookingsInput = {
    where?: CarBookingWhereInput
    data: XOR<CarBookingUpdateWithoutTransferBookingsInput, CarBookingUncheckedUpdateWithoutTransferBookingsInput>
  }

  export type CarBookingUpdateWithoutTransferBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    vehicleType?: EnumTransportTypeFieldUpdateOperationsInput | $Enums.TransportType
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestCount?: IntFieldUpdateOperationsInput | number
    pickupLocation?: NullableStringFieldUpdateOperationsInput | string | null
    dropoffLocation?: NullableStringFieldUpdateOperationsInput | string | null
    vat?: BoolFieldUpdateOperationsInput | boolean
    sellingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    receivingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentCollection?: EnumPaymentCollectionFieldUpdateOperationsInput | $Enums.PaymentCollection
    paymentCollectionNote?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumCarBookingStatusFieldUpdateOperationsInput | $Enums.CarBookingStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    routes?: NullableStringFieldUpdateOperationsInput | string | null
    isTransfer?: BoolFieldUpdateOperationsInput | boolean
    transferReason?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    travelAgency?: TravelAgencyUpdateOneWithoutCarBookingsNestedInput
    createdBy?: UserUpdateOneWithoutCreatedCarBookingsNestedInput
    updatedBy?: UserUpdateOneWithoutUpdatedCarBookingsNestedInput
    transferFrom?: CarBookingUpdateOneWithoutTransferBookingsNestedInput
    transferToAgency?: TravelAgencyUpdateOneWithoutTransferredCarBookingsNestedInput
  }

  export type CarBookingUncheckedUpdateWithoutTransferBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    travelAgencyId?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleType?: EnumTransportTypeFieldUpdateOperationsInput | $Enums.TransportType
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestCount?: IntFieldUpdateOperationsInput | number
    pickupLocation?: NullableStringFieldUpdateOperationsInput | string | null
    dropoffLocation?: NullableStringFieldUpdateOperationsInput | string | null
    vat?: BoolFieldUpdateOperationsInput | boolean
    sellingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    receivingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentCollection?: EnumPaymentCollectionFieldUpdateOperationsInput | $Enums.PaymentCollection
    paymentCollectionNote?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumCarBookingStatusFieldUpdateOperationsInput | $Enums.CarBookingStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    routes?: NullableStringFieldUpdateOperationsInput | string | null
    isTransfer?: BoolFieldUpdateOperationsInput | boolean
    transferFromId?: NullableStringFieldUpdateOperationsInput | string | null
    transferToAgencyId?: NullableStringFieldUpdateOperationsInput | string | null
    transferReason?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CarBookingUpsertWithWhereUniqueWithoutTransferFromInput = {
    where: CarBookingWhereUniqueInput
    update: XOR<CarBookingUpdateWithoutTransferFromInput, CarBookingUncheckedUpdateWithoutTransferFromInput>
    create: XOR<CarBookingCreateWithoutTransferFromInput, CarBookingUncheckedCreateWithoutTransferFromInput>
  }

  export type CarBookingUpdateWithWhereUniqueWithoutTransferFromInput = {
    where: CarBookingWhereUniqueInput
    data: XOR<CarBookingUpdateWithoutTransferFromInput, CarBookingUncheckedUpdateWithoutTransferFromInput>
  }

  export type CarBookingUpdateManyWithWhereWithoutTransferFromInput = {
    where: CarBookingScalarWhereInput
    data: XOR<CarBookingUpdateManyMutationInput, CarBookingUncheckedUpdateManyWithoutTransferFromInput>
  }

  export type TravelAgencyUpsertWithoutTransferredCarBookingsInput = {
    update: XOR<TravelAgencyUpdateWithoutTransferredCarBookingsInput, TravelAgencyUncheckedUpdateWithoutTransferredCarBookingsInput>
    create: XOR<TravelAgencyCreateWithoutTransferredCarBookingsInput, TravelAgencyUncheckedCreateWithoutTransferredCarBookingsInput>
    where?: TravelAgencyWhereInput
  }

  export type TravelAgencyUpdateToOneWithWhereWithoutTransferredCarBookingsInput = {
    where?: TravelAgencyWhereInput
    data: XOR<TravelAgencyUpdateWithoutTransferredCarBookingsInput, TravelAgencyUncheckedUpdateWithoutTransferredCarBookingsInput>
  }

  export type TravelAgencyUpdateWithoutTransferredCarBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedTravelAgenciesNestedInput
    updatedBy?: UserUpdateOneWithoutUpdatedTravelAgenciesNestedInput
    carBookings?: CarBookingUpdateManyWithoutTravelAgencyNestedInput
  }

  export type TravelAgencyUncheckedUpdateWithoutTransferredCarBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    carBookings?: CarBookingUncheckedUpdateManyWithoutTravelAgencyNestedInput
  }

  export type UserCreateWithoutCreatedPaymentRecordsInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    tel?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    emailVerified?: boolean
    mustChangePassword?: boolean
    emailVerificationToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogCreateNestedManyWithoutUserInput
    createdTravelAgencies?: TravelAgencyCreateNestedManyWithoutCreatedByInput
    updatedTravelAgencies?: TravelAgencyCreateNestedManyWithoutUpdatedByInput
    createdCarBookings?: CarBookingCreateNestedManyWithoutCreatedByInput
    updatedCarBookings?: CarBookingCreateNestedManyWithoutUpdatedByInput
    createdExpenses?: ExpenseCreateNestedManyWithoutCreatedByInput
    updatedExpenses?: ExpenseCreateNestedManyWithoutUpdatedByInput
  }

  export type UserUncheckedCreateWithoutCreatedPaymentRecordsInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    tel?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    emailVerified?: boolean
    mustChangePassword?: boolean
    emailVerificationToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
    createdTravelAgencies?: TravelAgencyUncheckedCreateNestedManyWithoutCreatedByInput
    updatedTravelAgencies?: TravelAgencyUncheckedCreateNestedManyWithoutUpdatedByInput
    createdCarBookings?: CarBookingUncheckedCreateNestedManyWithoutCreatedByInput
    updatedCarBookings?: CarBookingUncheckedCreateNestedManyWithoutUpdatedByInput
    createdExpenses?: ExpenseUncheckedCreateNestedManyWithoutCreatedByInput
    updatedExpenses?: ExpenseUncheckedCreateNestedManyWithoutUpdatedByInput
  }

  export type UserCreateOrConnectWithoutCreatedPaymentRecordsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedPaymentRecordsInput, UserUncheckedCreateWithoutCreatedPaymentRecordsInput>
  }

  export type UserUpsertWithoutCreatedPaymentRecordsInput = {
    update: XOR<UserUpdateWithoutCreatedPaymentRecordsInput, UserUncheckedUpdateWithoutCreatedPaymentRecordsInput>
    create: XOR<UserCreateWithoutCreatedPaymentRecordsInput, UserUncheckedCreateWithoutCreatedPaymentRecordsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedPaymentRecordsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedPaymentRecordsInput, UserUncheckedUpdateWithoutCreatedPaymentRecordsInput>
  }

  export type UserUpdateWithoutCreatedPaymentRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutUserNestedInput
    createdTravelAgencies?: TravelAgencyUpdateManyWithoutCreatedByNestedInput
    updatedTravelAgencies?: TravelAgencyUpdateManyWithoutUpdatedByNestedInput
    createdCarBookings?: CarBookingUpdateManyWithoutCreatedByNestedInput
    updatedCarBookings?: CarBookingUpdateManyWithoutUpdatedByNestedInput
    createdExpenses?: ExpenseUpdateManyWithoutCreatedByNestedInput
    updatedExpenses?: ExpenseUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedPaymentRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
    createdTravelAgencies?: TravelAgencyUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedTravelAgencies?: TravelAgencyUncheckedUpdateManyWithoutUpdatedByNestedInput
    createdCarBookings?: CarBookingUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedCarBookings?: CarBookingUncheckedUpdateManyWithoutUpdatedByNestedInput
    createdExpenses?: ExpenseUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedExpenses?: ExpenseUncheckedUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserCreateWithoutCreatedExpensesInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    tel?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    emailVerified?: boolean
    mustChangePassword?: boolean
    emailVerificationToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogCreateNestedManyWithoutUserInput
    createdTravelAgencies?: TravelAgencyCreateNestedManyWithoutCreatedByInput
    updatedTravelAgencies?: TravelAgencyCreateNestedManyWithoutUpdatedByInput
    createdCarBookings?: CarBookingCreateNestedManyWithoutCreatedByInput
    updatedCarBookings?: CarBookingCreateNestedManyWithoutUpdatedByInput
    createdPaymentRecords?: PaymentRecordCreateNestedManyWithoutCreatedByInput
    updatedExpenses?: ExpenseCreateNestedManyWithoutUpdatedByInput
  }

  export type UserUncheckedCreateWithoutCreatedExpensesInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    tel?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    emailVerified?: boolean
    mustChangePassword?: boolean
    emailVerificationToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
    createdTravelAgencies?: TravelAgencyUncheckedCreateNestedManyWithoutCreatedByInput
    updatedTravelAgencies?: TravelAgencyUncheckedCreateNestedManyWithoutUpdatedByInput
    createdCarBookings?: CarBookingUncheckedCreateNestedManyWithoutCreatedByInput
    updatedCarBookings?: CarBookingUncheckedCreateNestedManyWithoutUpdatedByInput
    createdPaymentRecords?: PaymentRecordUncheckedCreateNestedManyWithoutCreatedByInput
    updatedExpenses?: ExpenseUncheckedCreateNestedManyWithoutUpdatedByInput
  }

  export type UserCreateOrConnectWithoutCreatedExpensesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedExpensesInput, UserUncheckedCreateWithoutCreatedExpensesInput>
  }

  export type UserCreateWithoutUpdatedExpensesInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    tel?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    emailVerified?: boolean
    mustChangePassword?: boolean
    emailVerificationToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogCreateNestedManyWithoutUserInput
    createdTravelAgencies?: TravelAgencyCreateNestedManyWithoutCreatedByInput
    updatedTravelAgencies?: TravelAgencyCreateNestedManyWithoutUpdatedByInput
    createdCarBookings?: CarBookingCreateNestedManyWithoutCreatedByInput
    updatedCarBookings?: CarBookingCreateNestedManyWithoutUpdatedByInput
    createdPaymentRecords?: PaymentRecordCreateNestedManyWithoutCreatedByInput
    createdExpenses?: ExpenseCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutUpdatedExpensesInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    tel?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    emailVerified?: boolean
    mustChangePassword?: boolean
    emailVerificationToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
    createdTravelAgencies?: TravelAgencyUncheckedCreateNestedManyWithoutCreatedByInput
    updatedTravelAgencies?: TravelAgencyUncheckedCreateNestedManyWithoutUpdatedByInput
    createdCarBookings?: CarBookingUncheckedCreateNestedManyWithoutCreatedByInput
    updatedCarBookings?: CarBookingUncheckedCreateNestedManyWithoutUpdatedByInput
    createdPaymentRecords?: PaymentRecordUncheckedCreateNestedManyWithoutCreatedByInput
    createdExpenses?: ExpenseUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutUpdatedExpensesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUpdatedExpensesInput, UserUncheckedCreateWithoutUpdatedExpensesInput>
  }

  export type UserUpsertWithoutCreatedExpensesInput = {
    update: XOR<UserUpdateWithoutCreatedExpensesInput, UserUncheckedUpdateWithoutCreatedExpensesInput>
    create: XOR<UserCreateWithoutCreatedExpensesInput, UserUncheckedCreateWithoutCreatedExpensesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedExpensesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedExpensesInput, UserUncheckedUpdateWithoutCreatedExpensesInput>
  }

  export type UserUpdateWithoutCreatedExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutUserNestedInput
    createdTravelAgencies?: TravelAgencyUpdateManyWithoutCreatedByNestedInput
    updatedTravelAgencies?: TravelAgencyUpdateManyWithoutUpdatedByNestedInput
    createdCarBookings?: CarBookingUpdateManyWithoutCreatedByNestedInput
    updatedCarBookings?: CarBookingUpdateManyWithoutUpdatedByNestedInput
    createdPaymentRecords?: PaymentRecordUpdateManyWithoutCreatedByNestedInput
    updatedExpenses?: ExpenseUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
    createdTravelAgencies?: TravelAgencyUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedTravelAgencies?: TravelAgencyUncheckedUpdateManyWithoutUpdatedByNestedInput
    createdCarBookings?: CarBookingUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedCarBookings?: CarBookingUncheckedUpdateManyWithoutUpdatedByNestedInput
    createdPaymentRecords?: PaymentRecordUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedExpenses?: ExpenseUncheckedUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUpsertWithoutUpdatedExpensesInput = {
    update: XOR<UserUpdateWithoutUpdatedExpensesInput, UserUncheckedUpdateWithoutUpdatedExpensesInput>
    create: XOR<UserCreateWithoutUpdatedExpensesInput, UserUncheckedCreateWithoutUpdatedExpensesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUpdatedExpensesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUpdatedExpensesInput, UserUncheckedUpdateWithoutUpdatedExpensesInput>
  }

  export type UserUpdateWithoutUpdatedExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutUserNestedInput
    createdTravelAgencies?: TravelAgencyUpdateManyWithoutCreatedByNestedInput
    updatedTravelAgencies?: TravelAgencyUpdateManyWithoutUpdatedByNestedInput
    createdCarBookings?: CarBookingUpdateManyWithoutCreatedByNestedInput
    updatedCarBookings?: CarBookingUpdateManyWithoutUpdatedByNestedInput
    createdPaymentRecords?: PaymentRecordUpdateManyWithoutCreatedByNestedInput
    createdExpenses?: ExpenseUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutUpdatedExpensesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
    createdTravelAgencies?: TravelAgencyUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedTravelAgencies?: TravelAgencyUncheckedUpdateManyWithoutUpdatedByNestedInput
    createdCarBookings?: CarBookingUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedCarBookings?: CarBookingUncheckedUpdateManyWithoutUpdatedByNestedInput
    createdPaymentRecords?: PaymentRecordUncheckedUpdateManyWithoutCreatedByNestedInput
    createdExpenses?: ExpenseUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserCreateWithoutActivityLogsInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    tel?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    emailVerified?: boolean
    mustChangePassword?: boolean
    emailVerificationToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    createdTravelAgencies?: TravelAgencyCreateNestedManyWithoutCreatedByInput
    updatedTravelAgencies?: TravelAgencyCreateNestedManyWithoutUpdatedByInput
    createdCarBookings?: CarBookingCreateNestedManyWithoutCreatedByInput
    updatedCarBookings?: CarBookingCreateNestedManyWithoutUpdatedByInput
    createdPaymentRecords?: PaymentRecordCreateNestedManyWithoutCreatedByInput
    createdExpenses?: ExpenseCreateNestedManyWithoutCreatedByInput
    updatedExpenses?: ExpenseCreateNestedManyWithoutUpdatedByInput
  }

  export type UserUncheckedCreateWithoutActivityLogsInput = {
    id?: string
    email: string
    passwordHash: string
    fullName: string
    tel?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    isActive?: boolean
    emailVerified?: boolean
    mustChangePassword?: boolean
    emailVerificationToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpires?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    createdTravelAgencies?: TravelAgencyUncheckedCreateNestedManyWithoutCreatedByInput
    updatedTravelAgencies?: TravelAgencyUncheckedCreateNestedManyWithoutUpdatedByInput
    createdCarBookings?: CarBookingUncheckedCreateNestedManyWithoutCreatedByInput
    updatedCarBookings?: CarBookingUncheckedCreateNestedManyWithoutUpdatedByInput
    createdPaymentRecords?: PaymentRecordUncheckedCreateNestedManyWithoutCreatedByInput
    createdExpenses?: ExpenseUncheckedCreateNestedManyWithoutCreatedByInput
    updatedExpenses?: ExpenseUncheckedCreateNestedManyWithoutUpdatedByInput
  }

  export type UserCreateOrConnectWithoutActivityLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutActivityLogsInput, UserUncheckedCreateWithoutActivityLogsInput>
  }

  export type UserUpsertWithoutActivityLogsInput = {
    update: XOR<UserUpdateWithoutActivityLogsInput, UserUncheckedUpdateWithoutActivityLogsInput>
    create: XOR<UserCreateWithoutActivityLogsInput, UserUncheckedCreateWithoutActivityLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutActivityLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutActivityLogsInput, UserUncheckedUpdateWithoutActivityLogsInput>
  }

  export type UserUpdateWithoutActivityLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    createdTravelAgencies?: TravelAgencyUpdateManyWithoutCreatedByNestedInput
    updatedTravelAgencies?: TravelAgencyUpdateManyWithoutUpdatedByNestedInput
    createdCarBookings?: CarBookingUpdateManyWithoutCreatedByNestedInput
    updatedCarBookings?: CarBookingUpdateManyWithoutUpdatedByNestedInput
    createdPaymentRecords?: PaymentRecordUpdateManyWithoutCreatedByNestedInput
    createdExpenses?: ExpenseUpdateManyWithoutCreatedByNestedInput
    updatedExpenses?: ExpenseUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutActivityLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    mustChangePassword?: BoolFieldUpdateOperationsInput | boolean
    emailVerificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    createdTravelAgencies?: TravelAgencyUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedTravelAgencies?: TravelAgencyUncheckedUpdateManyWithoutUpdatedByNestedInput
    createdCarBookings?: CarBookingUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedCarBookings?: CarBookingUncheckedUpdateManyWithoutUpdatedByNestedInput
    createdPaymentRecords?: PaymentRecordUncheckedUpdateManyWithoutCreatedByNestedInput
    createdExpenses?: ExpenseUncheckedUpdateManyWithoutCreatedByNestedInput
    updatedExpenses?: ExpenseUncheckedUpdateManyWithoutUpdatedByNestedInput
  }

  export type RefreshTokenCreateManyUserInput = {
    id?: string
    jti: string
    token: string
    deviceInfo?: string | null
    ipAddress?: string | null
    expiresAt: Date | string
    isRevoked?: boolean
    revokedAt?: Date | string | null
    revokedBy?: string | null
    createdAt?: Date | string
    lastUsedAt?: Date | string | null
  }

  export type ActivityLogCreateManyUserInput = {
    id?: string
    action: $Enums.ActivityAction
    entityType: string
    entityId?: string | null
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type TravelAgencyCreateManyCreatedByInput = {
    id?: string
    name: string
    tel?: string | null
    address?: string | null
    note?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedById?: string | null
  }

  export type TravelAgencyCreateManyUpdatedByInput = {
    id?: string
    name: string
    tel?: string | null
    address?: string | null
    note?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
  }

  export type CarBookingCreateManyCreatedByInput = {
    id?: string
    bookingCode: string
    travelAgencyId?: string | null
    vehicleType: $Enums.TransportType
    serviceDate: Date | string
    guestName: string
    guestPhone?: string | null
    guestCount?: number
    pickupLocation?: string | null
    dropoffLocation?: string | null
    vat?: boolean
    sellingPrice: Decimal | DecimalJsLike | number | string
    receivingPrice: Decimal | DecimalJsLike | number | string
    debtAmount: Decimal | DecimalJsLike | number | string
    paymentCollection: $Enums.PaymentCollection
    paymentCollectionNote?: string | null
    paymentStatus?: $Enums.PaymentStatus
    paidAt?: Date | string | null
    status?: $Enums.CarBookingStatus
    note?: string | null
    routes?: string | null
    isTransfer?: boolean
    transferFromId?: string | null
    transferToAgencyId?: string | null
    transferReason?: string | null
    transferredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedById?: string | null
  }

  export type CarBookingCreateManyUpdatedByInput = {
    id?: string
    bookingCode: string
    travelAgencyId?: string | null
    vehicleType: $Enums.TransportType
    serviceDate: Date | string
    guestName: string
    guestPhone?: string | null
    guestCount?: number
    pickupLocation?: string | null
    dropoffLocation?: string | null
    vat?: boolean
    sellingPrice: Decimal | DecimalJsLike | number | string
    receivingPrice: Decimal | DecimalJsLike | number | string
    debtAmount: Decimal | DecimalJsLike | number | string
    paymentCollection: $Enums.PaymentCollection
    paymentCollectionNote?: string | null
    paymentStatus?: $Enums.PaymentStatus
    paidAt?: Date | string | null
    status?: $Enums.CarBookingStatus
    note?: string | null
    routes?: string | null
    isTransfer?: boolean
    transferFromId?: string | null
    transferToAgencyId?: string | null
    transferReason?: string | null
    transferredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
  }

  export type PaymentRecordCreateManyCreatedByInput = {
    id?: string
    partnerType: $Enums.PartnerType
    partnerId: string
    debtRecordId?: string | null
    paymentDirection: $Enums.PaymentDirection
    amount: Decimal | DecimalJsLike | number | string
    paymentDate?: Date | string
    paymentMethod?: string | null
    referenceNumber?: string | null
    note?: string | null
    receiptUrl?: string | null
    createdAt?: Date | string
  }

  export type ExpenseCreateManyCreatedByInput = {
    id?: string
    title: string
    amount: Decimal | DecimalJsLike | number | string
    category: $Enums.ExpenseCategory
    month: number
    year: number
    note?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedById?: string | null
  }

  export type ExpenseCreateManyUpdatedByInput = {
    id?: string
    title: string
    amount: Decimal | DecimalJsLike | number | string
    category: $Enums.ExpenseCategory
    month: number
    year: number
    note?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
  }

  export type RefreshTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    jti?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RefreshTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    jti?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    jti?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    deviceInfo?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ActivityLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumActivityActionFieldUpdateOperationsInput | $Enums.ActivityAction
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumActivityActionFieldUpdateOperationsInput | $Enums.ActivityAction
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumActivityActionFieldUpdateOperationsInput | $Enums.ActivityAction
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TravelAgencyUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: UserUpdateOneWithoutUpdatedTravelAgenciesNestedInput
    carBookings?: CarBookingUpdateManyWithoutTravelAgencyNestedInput
    transferredCarBookings?: CarBookingUpdateManyWithoutTransferToAgencyNestedInput
  }

  export type TravelAgencyUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    carBookings?: CarBookingUncheckedUpdateManyWithoutTravelAgencyNestedInput
    transferredCarBookings?: CarBookingUncheckedUpdateManyWithoutTransferToAgencyNestedInput
  }

  export type TravelAgencyUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TravelAgencyUpdateWithoutUpdatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedTravelAgenciesNestedInput
    carBookings?: CarBookingUpdateManyWithoutTravelAgencyNestedInput
    transferredCarBookings?: CarBookingUpdateManyWithoutTransferToAgencyNestedInput
  }

  export type TravelAgencyUncheckedUpdateWithoutUpdatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    carBookings?: CarBookingUncheckedUpdateManyWithoutTravelAgencyNestedInput
    transferredCarBookings?: CarBookingUncheckedUpdateManyWithoutTransferToAgencyNestedInput
  }

  export type TravelAgencyUncheckedUpdateManyWithoutUpdatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tel?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CarBookingUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    vehicleType?: EnumTransportTypeFieldUpdateOperationsInput | $Enums.TransportType
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestCount?: IntFieldUpdateOperationsInput | number
    pickupLocation?: NullableStringFieldUpdateOperationsInput | string | null
    dropoffLocation?: NullableStringFieldUpdateOperationsInput | string | null
    vat?: BoolFieldUpdateOperationsInput | boolean
    sellingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    receivingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentCollection?: EnumPaymentCollectionFieldUpdateOperationsInput | $Enums.PaymentCollection
    paymentCollectionNote?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumCarBookingStatusFieldUpdateOperationsInput | $Enums.CarBookingStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    routes?: NullableStringFieldUpdateOperationsInput | string | null
    isTransfer?: BoolFieldUpdateOperationsInput | boolean
    transferReason?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    travelAgency?: TravelAgencyUpdateOneWithoutCarBookingsNestedInput
    updatedBy?: UserUpdateOneWithoutUpdatedCarBookingsNestedInput
    transferFrom?: CarBookingUpdateOneWithoutTransferBookingsNestedInput
    transferBookings?: CarBookingUpdateManyWithoutTransferFromNestedInput
    transferToAgency?: TravelAgencyUpdateOneWithoutTransferredCarBookingsNestedInput
  }

  export type CarBookingUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    travelAgencyId?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleType?: EnumTransportTypeFieldUpdateOperationsInput | $Enums.TransportType
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestCount?: IntFieldUpdateOperationsInput | number
    pickupLocation?: NullableStringFieldUpdateOperationsInput | string | null
    dropoffLocation?: NullableStringFieldUpdateOperationsInput | string | null
    vat?: BoolFieldUpdateOperationsInput | boolean
    sellingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    receivingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentCollection?: EnumPaymentCollectionFieldUpdateOperationsInput | $Enums.PaymentCollection
    paymentCollectionNote?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumCarBookingStatusFieldUpdateOperationsInput | $Enums.CarBookingStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    routes?: NullableStringFieldUpdateOperationsInput | string | null
    isTransfer?: BoolFieldUpdateOperationsInput | boolean
    transferFromId?: NullableStringFieldUpdateOperationsInput | string | null
    transferToAgencyId?: NullableStringFieldUpdateOperationsInput | string | null
    transferReason?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    transferBookings?: CarBookingUncheckedUpdateManyWithoutTransferFromNestedInput
  }

  export type CarBookingUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    travelAgencyId?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleType?: EnumTransportTypeFieldUpdateOperationsInput | $Enums.TransportType
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestCount?: IntFieldUpdateOperationsInput | number
    pickupLocation?: NullableStringFieldUpdateOperationsInput | string | null
    dropoffLocation?: NullableStringFieldUpdateOperationsInput | string | null
    vat?: BoolFieldUpdateOperationsInput | boolean
    sellingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    receivingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentCollection?: EnumPaymentCollectionFieldUpdateOperationsInput | $Enums.PaymentCollection
    paymentCollectionNote?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumCarBookingStatusFieldUpdateOperationsInput | $Enums.CarBookingStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    routes?: NullableStringFieldUpdateOperationsInput | string | null
    isTransfer?: BoolFieldUpdateOperationsInput | boolean
    transferFromId?: NullableStringFieldUpdateOperationsInput | string | null
    transferToAgencyId?: NullableStringFieldUpdateOperationsInput | string | null
    transferReason?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CarBookingUpdateWithoutUpdatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    vehicleType?: EnumTransportTypeFieldUpdateOperationsInput | $Enums.TransportType
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestCount?: IntFieldUpdateOperationsInput | number
    pickupLocation?: NullableStringFieldUpdateOperationsInput | string | null
    dropoffLocation?: NullableStringFieldUpdateOperationsInput | string | null
    vat?: BoolFieldUpdateOperationsInput | boolean
    sellingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    receivingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentCollection?: EnumPaymentCollectionFieldUpdateOperationsInput | $Enums.PaymentCollection
    paymentCollectionNote?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumCarBookingStatusFieldUpdateOperationsInput | $Enums.CarBookingStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    routes?: NullableStringFieldUpdateOperationsInput | string | null
    isTransfer?: BoolFieldUpdateOperationsInput | boolean
    transferReason?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    travelAgency?: TravelAgencyUpdateOneWithoutCarBookingsNestedInput
    createdBy?: UserUpdateOneWithoutCreatedCarBookingsNestedInput
    transferFrom?: CarBookingUpdateOneWithoutTransferBookingsNestedInput
    transferBookings?: CarBookingUpdateManyWithoutTransferFromNestedInput
    transferToAgency?: TravelAgencyUpdateOneWithoutTransferredCarBookingsNestedInput
  }

  export type CarBookingUncheckedUpdateWithoutUpdatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    travelAgencyId?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleType?: EnumTransportTypeFieldUpdateOperationsInput | $Enums.TransportType
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestCount?: IntFieldUpdateOperationsInput | number
    pickupLocation?: NullableStringFieldUpdateOperationsInput | string | null
    dropoffLocation?: NullableStringFieldUpdateOperationsInput | string | null
    vat?: BoolFieldUpdateOperationsInput | boolean
    sellingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    receivingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentCollection?: EnumPaymentCollectionFieldUpdateOperationsInput | $Enums.PaymentCollection
    paymentCollectionNote?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumCarBookingStatusFieldUpdateOperationsInput | $Enums.CarBookingStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    routes?: NullableStringFieldUpdateOperationsInput | string | null
    isTransfer?: BoolFieldUpdateOperationsInput | boolean
    transferFromId?: NullableStringFieldUpdateOperationsInput | string | null
    transferToAgencyId?: NullableStringFieldUpdateOperationsInput | string | null
    transferReason?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    transferBookings?: CarBookingUncheckedUpdateManyWithoutTransferFromNestedInput
  }

  export type CarBookingUncheckedUpdateManyWithoutUpdatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    travelAgencyId?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleType?: EnumTransportTypeFieldUpdateOperationsInput | $Enums.TransportType
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestCount?: IntFieldUpdateOperationsInput | number
    pickupLocation?: NullableStringFieldUpdateOperationsInput | string | null
    dropoffLocation?: NullableStringFieldUpdateOperationsInput | string | null
    vat?: BoolFieldUpdateOperationsInput | boolean
    sellingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    receivingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentCollection?: EnumPaymentCollectionFieldUpdateOperationsInput | $Enums.PaymentCollection
    paymentCollectionNote?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumCarBookingStatusFieldUpdateOperationsInput | $Enums.CarBookingStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    routes?: NullableStringFieldUpdateOperationsInput | string | null
    isTransfer?: BoolFieldUpdateOperationsInput | boolean
    transferFromId?: NullableStringFieldUpdateOperationsInput | string | null
    transferToAgencyId?: NullableStringFieldUpdateOperationsInput | string | null
    transferReason?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaymentRecordUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    partnerType?: EnumPartnerTypeFieldUpdateOperationsInput | $Enums.PartnerType
    partnerId?: StringFieldUpdateOperationsInput | string
    debtRecordId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDirection?: EnumPaymentDirectionFieldUpdateOperationsInput | $Enums.PaymentDirection
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    referenceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentRecordUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    partnerType?: EnumPartnerTypeFieldUpdateOperationsInput | $Enums.PartnerType
    partnerId?: StringFieldUpdateOperationsInput | string
    debtRecordId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDirection?: EnumPaymentDirectionFieldUpdateOperationsInput | $Enums.PaymentDirection
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    referenceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentRecordUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    partnerType?: EnumPartnerTypeFieldUpdateOperationsInput | $Enums.PartnerType
    partnerId?: StringFieldUpdateOperationsInput | string
    debtRecordId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentDirection?: EnumPaymentDirectionFieldUpdateOperationsInput | $Enums.PaymentDirection
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    referenceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    receiptUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    category?: EnumExpenseCategoryFieldUpdateOperationsInput | $Enums.ExpenseCategory
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: UserUpdateOneWithoutUpdatedExpensesNestedInput
  }

  export type ExpenseUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    category?: EnumExpenseCategoryFieldUpdateOperationsInput | $Enums.ExpenseCategory
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExpenseUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    category?: EnumExpenseCategoryFieldUpdateOperationsInput | $Enums.ExpenseCategory
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExpenseUpdateWithoutUpdatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    category?: EnumExpenseCategoryFieldUpdateOperationsInput | $Enums.ExpenseCategory
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedExpensesNestedInput
  }

  export type ExpenseUncheckedUpdateWithoutUpdatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    category?: EnumExpenseCategoryFieldUpdateOperationsInput | $Enums.ExpenseCategory
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExpenseUncheckedUpdateManyWithoutUpdatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    category?: EnumExpenseCategoryFieldUpdateOperationsInput | $Enums.ExpenseCategory
    month?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CarBookingCreateManyTravelAgencyInput = {
    id?: string
    bookingCode: string
    vehicleType: $Enums.TransportType
    serviceDate: Date | string
    guestName: string
    guestPhone?: string | null
    guestCount?: number
    pickupLocation?: string | null
    dropoffLocation?: string | null
    vat?: boolean
    sellingPrice: Decimal | DecimalJsLike | number | string
    receivingPrice: Decimal | DecimalJsLike | number | string
    debtAmount: Decimal | DecimalJsLike | number | string
    paymentCollection: $Enums.PaymentCollection
    paymentCollectionNote?: string | null
    paymentStatus?: $Enums.PaymentStatus
    paidAt?: Date | string | null
    status?: $Enums.CarBookingStatus
    note?: string | null
    routes?: string | null
    isTransfer?: boolean
    transferFromId?: string | null
    transferToAgencyId?: string | null
    transferReason?: string | null
    transferredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    updatedById?: string | null
  }

  export type CarBookingCreateManyTransferToAgencyInput = {
    id?: string
    bookingCode: string
    travelAgencyId?: string | null
    vehicleType: $Enums.TransportType
    serviceDate: Date | string
    guestName: string
    guestPhone?: string | null
    guestCount?: number
    pickupLocation?: string | null
    dropoffLocation?: string | null
    vat?: boolean
    sellingPrice: Decimal | DecimalJsLike | number | string
    receivingPrice: Decimal | DecimalJsLike | number | string
    debtAmount: Decimal | DecimalJsLike | number | string
    paymentCollection: $Enums.PaymentCollection
    paymentCollectionNote?: string | null
    paymentStatus?: $Enums.PaymentStatus
    paidAt?: Date | string | null
    status?: $Enums.CarBookingStatus
    note?: string | null
    routes?: string | null
    isTransfer?: boolean
    transferFromId?: string | null
    transferReason?: string | null
    transferredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    updatedById?: string | null
  }

  export type CarBookingUpdateWithoutTravelAgencyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    vehicleType?: EnumTransportTypeFieldUpdateOperationsInput | $Enums.TransportType
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestCount?: IntFieldUpdateOperationsInput | number
    pickupLocation?: NullableStringFieldUpdateOperationsInput | string | null
    dropoffLocation?: NullableStringFieldUpdateOperationsInput | string | null
    vat?: BoolFieldUpdateOperationsInput | boolean
    sellingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    receivingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentCollection?: EnumPaymentCollectionFieldUpdateOperationsInput | $Enums.PaymentCollection
    paymentCollectionNote?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumCarBookingStatusFieldUpdateOperationsInput | $Enums.CarBookingStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    routes?: NullableStringFieldUpdateOperationsInput | string | null
    isTransfer?: BoolFieldUpdateOperationsInput | boolean
    transferReason?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedCarBookingsNestedInput
    updatedBy?: UserUpdateOneWithoutUpdatedCarBookingsNestedInput
    transferFrom?: CarBookingUpdateOneWithoutTransferBookingsNestedInput
    transferBookings?: CarBookingUpdateManyWithoutTransferFromNestedInput
    transferToAgency?: TravelAgencyUpdateOneWithoutTransferredCarBookingsNestedInput
  }

  export type CarBookingUncheckedUpdateWithoutTravelAgencyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    vehicleType?: EnumTransportTypeFieldUpdateOperationsInput | $Enums.TransportType
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestCount?: IntFieldUpdateOperationsInput | number
    pickupLocation?: NullableStringFieldUpdateOperationsInput | string | null
    dropoffLocation?: NullableStringFieldUpdateOperationsInput | string | null
    vat?: BoolFieldUpdateOperationsInput | boolean
    sellingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    receivingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentCollection?: EnumPaymentCollectionFieldUpdateOperationsInput | $Enums.PaymentCollection
    paymentCollectionNote?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumCarBookingStatusFieldUpdateOperationsInput | $Enums.CarBookingStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    routes?: NullableStringFieldUpdateOperationsInput | string | null
    isTransfer?: BoolFieldUpdateOperationsInput | boolean
    transferFromId?: NullableStringFieldUpdateOperationsInput | string | null
    transferToAgencyId?: NullableStringFieldUpdateOperationsInput | string | null
    transferReason?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    transferBookings?: CarBookingUncheckedUpdateManyWithoutTransferFromNestedInput
  }

  export type CarBookingUncheckedUpdateManyWithoutTravelAgencyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    vehicleType?: EnumTransportTypeFieldUpdateOperationsInput | $Enums.TransportType
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestCount?: IntFieldUpdateOperationsInput | number
    pickupLocation?: NullableStringFieldUpdateOperationsInput | string | null
    dropoffLocation?: NullableStringFieldUpdateOperationsInput | string | null
    vat?: BoolFieldUpdateOperationsInput | boolean
    sellingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    receivingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentCollection?: EnumPaymentCollectionFieldUpdateOperationsInput | $Enums.PaymentCollection
    paymentCollectionNote?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumCarBookingStatusFieldUpdateOperationsInput | $Enums.CarBookingStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    routes?: NullableStringFieldUpdateOperationsInput | string | null
    isTransfer?: BoolFieldUpdateOperationsInput | boolean
    transferFromId?: NullableStringFieldUpdateOperationsInput | string | null
    transferToAgencyId?: NullableStringFieldUpdateOperationsInput | string | null
    transferReason?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CarBookingUpdateWithoutTransferToAgencyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    vehicleType?: EnumTransportTypeFieldUpdateOperationsInput | $Enums.TransportType
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestCount?: IntFieldUpdateOperationsInput | number
    pickupLocation?: NullableStringFieldUpdateOperationsInput | string | null
    dropoffLocation?: NullableStringFieldUpdateOperationsInput | string | null
    vat?: BoolFieldUpdateOperationsInput | boolean
    sellingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    receivingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentCollection?: EnumPaymentCollectionFieldUpdateOperationsInput | $Enums.PaymentCollection
    paymentCollectionNote?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumCarBookingStatusFieldUpdateOperationsInput | $Enums.CarBookingStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    routes?: NullableStringFieldUpdateOperationsInput | string | null
    isTransfer?: BoolFieldUpdateOperationsInput | boolean
    transferReason?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    travelAgency?: TravelAgencyUpdateOneWithoutCarBookingsNestedInput
    createdBy?: UserUpdateOneWithoutCreatedCarBookingsNestedInput
    updatedBy?: UserUpdateOneWithoutUpdatedCarBookingsNestedInput
    transferFrom?: CarBookingUpdateOneWithoutTransferBookingsNestedInput
    transferBookings?: CarBookingUpdateManyWithoutTransferFromNestedInput
  }

  export type CarBookingUncheckedUpdateWithoutTransferToAgencyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    travelAgencyId?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleType?: EnumTransportTypeFieldUpdateOperationsInput | $Enums.TransportType
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestCount?: IntFieldUpdateOperationsInput | number
    pickupLocation?: NullableStringFieldUpdateOperationsInput | string | null
    dropoffLocation?: NullableStringFieldUpdateOperationsInput | string | null
    vat?: BoolFieldUpdateOperationsInput | boolean
    sellingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    receivingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentCollection?: EnumPaymentCollectionFieldUpdateOperationsInput | $Enums.PaymentCollection
    paymentCollectionNote?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumCarBookingStatusFieldUpdateOperationsInput | $Enums.CarBookingStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    routes?: NullableStringFieldUpdateOperationsInput | string | null
    isTransfer?: BoolFieldUpdateOperationsInput | boolean
    transferFromId?: NullableStringFieldUpdateOperationsInput | string | null
    transferReason?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    transferBookings?: CarBookingUncheckedUpdateManyWithoutTransferFromNestedInput
  }

  export type CarBookingUncheckedUpdateManyWithoutTransferToAgencyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    travelAgencyId?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleType?: EnumTransportTypeFieldUpdateOperationsInput | $Enums.TransportType
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestCount?: IntFieldUpdateOperationsInput | number
    pickupLocation?: NullableStringFieldUpdateOperationsInput | string | null
    dropoffLocation?: NullableStringFieldUpdateOperationsInput | string | null
    vat?: BoolFieldUpdateOperationsInput | boolean
    sellingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    receivingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentCollection?: EnumPaymentCollectionFieldUpdateOperationsInput | $Enums.PaymentCollection
    paymentCollectionNote?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumCarBookingStatusFieldUpdateOperationsInput | $Enums.CarBookingStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    routes?: NullableStringFieldUpdateOperationsInput | string | null
    isTransfer?: BoolFieldUpdateOperationsInput | boolean
    transferFromId?: NullableStringFieldUpdateOperationsInput | string | null
    transferReason?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CarBookingCreateManyTransferFromInput = {
    id?: string
    bookingCode: string
    travelAgencyId?: string | null
    vehicleType: $Enums.TransportType
    serviceDate: Date | string
    guestName: string
    guestPhone?: string | null
    guestCount?: number
    pickupLocation?: string | null
    dropoffLocation?: string | null
    vat?: boolean
    sellingPrice: Decimal | DecimalJsLike | number | string
    receivingPrice: Decimal | DecimalJsLike | number | string
    debtAmount: Decimal | DecimalJsLike | number | string
    paymentCollection: $Enums.PaymentCollection
    paymentCollectionNote?: string | null
    paymentStatus?: $Enums.PaymentStatus
    paidAt?: Date | string | null
    status?: $Enums.CarBookingStatus
    note?: string | null
    routes?: string | null
    isTransfer?: boolean
    transferToAgencyId?: string | null
    transferReason?: string | null
    transferredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdById?: string | null
    updatedById?: string | null
  }

  export type CarBookingUpdateWithoutTransferFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    vehicleType?: EnumTransportTypeFieldUpdateOperationsInput | $Enums.TransportType
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestCount?: IntFieldUpdateOperationsInput | number
    pickupLocation?: NullableStringFieldUpdateOperationsInput | string | null
    dropoffLocation?: NullableStringFieldUpdateOperationsInput | string | null
    vat?: BoolFieldUpdateOperationsInput | boolean
    sellingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    receivingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentCollection?: EnumPaymentCollectionFieldUpdateOperationsInput | $Enums.PaymentCollection
    paymentCollectionNote?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumCarBookingStatusFieldUpdateOperationsInput | $Enums.CarBookingStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    routes?: NullableStringFieldUpdateOperationsInput | string | null
    isTransfer?: BoolFieldUpdateOperationsInput | boolean
    transferReason?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    travelAgency?: TravelAgencyUpdateOneWithoutCarBookingsNestedInput
    createdBy?: UserUpdateOneWithoutCreatedCarBookingsNestedInput
    updatedBy?: UserUpdateOneWithoutUpdatedCarBookingsNestedInput
    transferBookings?: CarBookingUpdateManyWithoutTransferFromNestedInput
    transferToAgency?: TravelAgencyUpdateOneWithoutTransferredCarBookingsNestedInput
  }

  export type CarBookingUncheckedUpdateWithoutTransferFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    travelAgencyId?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleType?: EnumTransportTypeFieldUpdateOperationsInput | $Enums.TransportType
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestCount?: IntFieldUpdateOperationsInput | number
    pickupLocation?: NullableStringFieldUpdateOperationsInput | string | null
    dropoffLocation?: NullableStringFieldUpdateOperationsInput | string | null
    vat?: BoolFieldUpdateOperationsInput | boolean
    sellingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    receivingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentCollection?: EnumPaymentCollectionFieldUpdateOperationsInput | $Enums.PaymentCollection
    paymentCollectionNote?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumCarBookingStatusFieldUpdateOperationsInput | $Enums.CarBookingStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    routes?: NullableStringFieldUpdateOperationsInput | string | null
    isTransfer?: BoolFieldUpdateOperationsInput | boolean
    transferToAgencyId?: NullableStringFieldUpdateOperationsInput | string | null
    transferReason?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    transferBookings?: CarBookingUncheckedUpdateManyWithoutTransferFromNestedInput
  }

  export type CarBookingUncheckedUpdateManyWithoutTransferFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingCode?: StringFieldUpdateOperationsInput | string
    travelAgencyId?: NullableStringFieldUpdateOperationsInput | string | null
    vehicleType?: EnumTransportTypeFieldUpdateOperationsInput | $Enums.TransportType
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    guestName?: StringFieldUpdateOperationsInput | string
    guestPhone?: NullableStringFieldUpdateOperationsInput | string | null
    guestCount?: IntFieldUpdateOperationsInput | number
    pickupLocation?: NullableStringFieldUpdateOperationsInput | string | null
    dropoffLocation?: NullableStringFieldUpdateOperationsInput | string | null
    vat?: BoolFieldUpdateOperationsInput | boolean
    sellingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    receivingPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    debtAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentCollection?: EnumPaymentCollectionFieldUpdateOperationsInput | $Enums.PaymentCollection
    paymentCollectionNote?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumCarBookingStatusFieldUpdateOperationsInput | $Enums.CarBookingStatus
    note?: NullableStringFieldUpdateOperationsInput | string | null
    routes?: NullableStringFieldUpdateOperationsInput | string | null
    isTransfer?: BoolFieldUpdateOperationsInput | boolean
    transferToAgencyId?: NullableStringFieldUpdateOperationsInput | string | null
    transferReason?: NullableStringFieldUpdateOperationsInput | string | null
    transferredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}