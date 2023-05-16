/*
 * @Author: liu7i
 * @Date: 2023-05-16 14:50:41
 * @Last Modified by: liu7i
 * @Last Modified time: 2023-05-16 15:24:40
 */

export interface IWorkList {
  /** @param 名称 需要唯一 */
  name: string;
  /** @param 函数体 */
  taskContent: Function;
  /** @param 需要执行的次数 默认为100 */
  numberOfTimes?: number;
}

export interface IRecord {
  /** @param 执行顺序 */
  order: number;
  /** @param 执行所属函数体 */
  taskName: string;
  /** @param 执行耗时 单位ms */
  executionTime: number;
}

export interface IRunningResults {
  [key: string]: IRecord[];
}

export interface IAnalysis {
  /** @param 任务名称 */
  taskName: string;
  /** @param 总耗时 */
  total: number;
  /** @param 平均耗时 */
  average: number;
  /** @param 执行次数 */
  times: number;
}
