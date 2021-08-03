type ServiceMethod = (...args: any) => Promise<any>

export default interface IService {
  [methodName: string]: ServiceMethod
}
