import { FC, useRef } from 'react'
import { useSprings, animated, config } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import clamp from 'lodash.clamp'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import swap from 'lodash-move'

import styles from '../styles.module.css'
import TaskCard from './TaskCard'
import { ServedTasks } from '../hooks/useFetchTasksData'
import { User } from '@doist/todoist-api-typescript'

interface DragableListProps {
  items: ServedTasks[]
  collabData?: User[] | null
}

const fn =
  (order: number[], active = false, originalIndex = 0, curIndex = 0, y = 0) => 
  (index: number) => {
      return active && index === originalIndex
        ? {
          y: curIndex * 328 + y,
          scale: 1.1,
          zIndex: 1,
          shadow: 15,
          immediate: (key: string) => key === 'zIndex',
          config: (key: string) => (key === 'y' ? config.stiff : config.default),
        }
        : {
          y: order.indexOf(index) * 328,
          scale: 1,
          zIndex: 0,
          shadow: 1,
          immediate: false,
        }
    }

const DraggableList: FC<DragableListProps> = ({ items, collabData }) => {
  const order = useRef(items.map((_, index) => index));
  const [springs, api] = useSprings(items.length, fn(order.current))
  const bind = useDrag(({ args: [originalIndex], active, movement: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex)
    const curRow = clamp(Math.round((curIndex * 100 + y) / 100), 0, items.length - 1)
    const newOrder = swap(order.current, curIndex, curRow)
    api.start(fn(newOrder, active, originalIndex, curIndex, y))
    if (!active) order.current = newOrder
  })

  return (
    <div className={styles.content}>
      {springs.map(({ zIndex, shadow, y, scale }, i) => {
        return (
          <animated.div
            {...bind(i)}
            key={i}
            style={{
              zIndex,
              boxShadow: shadow.to(s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
              y,
              scale,
              touchAction: 'pan-y'
            }}
            children={<TaskCard data={items[i]} collabData={collabData} />}
          />
        )
      })}
    </div>
  )
}

export default DraggableList;