import * as React from 'react';
import {
  DndContext,
  KeyboardSensor,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import type { Active, UniqueIdentifier } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface ISortableContainerProps {
  children: JSX.Element | JSX.Element[];
  items: Array<{
    id: string;
    [key: string]: any;
  }>;
  onDragEnd: (...args: any) => void;
}

const SortableContainer: React.FunctionComponent<ISortableContainerProps> = (props) => {
  const { children, items, onDragEnd } = props;
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8, //8px,拖拽响应差值
      },
    }),
    // useSensor(KeyboardSensor, {
    //   coordinateGetter: sortableKeyboardCoordinates,
    // }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over?.id) {
      const activeIndex = items.findIndex(({ fe_id }) => fe_id === active.id);
      const overIndex = items.findIndex(({ fe_id }) => fe_id === over.id);
      onDragEnd(arrayMove(items, activeIndex, overIndex));
      // onChange(arrayMove(items, activeIndex, overIndex));
    }
  };
  return (
    <>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext strategy={verticalListSortingStrategy} items={items}>
          {children}
        </SortableContext>
      </DndContext>
    </>
  );
};

export default SortableContainer;
