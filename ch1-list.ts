import { ADT, match } from "./adt";

export type List<A> = ADT<{
  nil: {},
  cons: { head: A, tail: List<A> }
}>

export const nil: List<never> = {_type: "nil"}
export function cons<A>(head: A, tail?: List<A>): List<A> {
  return tail ? {_type: "cons", head, tail} : {_type: "cons", head, tail: nil};
}

export function list<A>(...items: A[]): List<A> {
  if(items.length === 0) {
    return nil;
  } else {
    const [head, ...tail] = items;
    return cons(head, list(...tail))
  }
}

export const List = {
  sum: function(ints: List<number>): number {
    return match(ints)({
      nil: () => 0,
      cons: ({head, tail}) => head + List.sum(tail)
    })
  },
  product: function(nums: List<number>): number {
    return match(nums)({
      nil: () => 1,
      cons: ({head, tail}) => head === 0 ? 0 : head * List.product(tail)
    })
  },
  // 3.2
  tail: function<A>(list: List<A>): List<A> {
    return match(list)({
      nil: () => nil,
      cons: ({head, tail}) => tail
    })
  },
  // 3.3
  setHead: function<A>(head: A, list: List<A>): List<A> {
    return cons(head, list);
  },
  // 3.4
  drop: function<A>(list: List<A>, toDrop: number): List<A> {
    if(toDrop <= 0) {
      return list
    } else {
      return match(list)({
        nil: () => nil,
        cons: ({tail}) => List.drop(tail, toDrop - 1)
      })
    }
  },
  // 3.5
  dropWhile: function<A>(list: List<A>, f: (a:A) => boolean): List<A> {
    return match(list)({
      nil: () => nil,
      cons: ({head, tail}) => {
        if(f(head)) {
          return List.dropWhile(tail, f)
        } else {
          return list
        }
      }
    })
  },
  // 3.6
  init: function<A>(list: List<A>): List<A> {
    return match(list)({
      nil: () => nil,
      cons: ({head, tail}) =>
        match(tail)({
          nil: () => nil,
          cons: () => cons(head, List.init(tail))
        })
    })
  }
}

