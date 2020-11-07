import { IObject } from "@daybrush/utils";
import { PROPERTIES, METHODS } from "./consts";
import Selecto from "./Selecto";
import {
    OnDragStart as OnParentDragStart,
    OnDrag as OnParentDrag,
    OnDragEnd as OnParentDragEnd,
} from "gesto";
import { DragScrollOptions } from "@scena/dragscroll";

/**
 * @memberof Selecto
 * @typedef
 * @property - Selection Element to apply for framework (private)
 * @property - The container to add a selection element for vanilla
 * @property - The area to drag selection element (default: container)
 * @property - Targets to select. You can register a queryselector or an Element. (default: [])
 * @property - When the target is clicked, the event is stopped and selected. (If hitTest is 0, it becomes click as well.) (default: true)
 * @property - Whether to select from the target inside (If hitTest is 0, it becomes inside select as well) (default: true)
 * @property - After the select, whether to select the next target with the selected target (deselected if the target is selected again). (default: false)
 * @property - Determines which key to continue selecting the next target via keydown and keyup.
 * @property - The container for keydown and keyup events
 * @property - The rate at which the target overlaps the drag area to be selected. (default: 100)
 * @property - Container to bound the selection area. If false, do not bound. If true, it is the container of selecto. (default: false)
 * @property - Set the scroll options, time, etc. to automatically scroll by dragging. (default: null)
 * @property - Checks whether this is an element to input text or contentEditable, and prevents dragging. (default: false)
 * @property - When dragging, preventDefault is called. (Touch occurs unconditionally) (default: false)
 * @property - add nonce property to style for CSP (default: "")
 * @property - Adjust the ratio of the selection. (default: 0)
 */
export interface SelectoOptions {
    target: HTMLElement | null;
    container: HTMLElement | null;
    dragContainer: Element | Window | Element[] | string;
    selectableTargets: Array<HTMLElement | string>;
    selectByClick: boolean;
    selectFromInside: boolean;
    continueSelect: boolean;
    toggleContinueSelect: string[][] | string[] | string | null;
    keyContainer: Document | HTMLElement | Window | null;
    hitRate: number;
    boundContainer: boolean | HTMLElement | string | null;
    scrollOptions: DragScrollOptions;
    checkInput: boolean;
    preventDefault: boolean;
    cspNonce: string;
    ratio: number;
    getElementRect: getElementRectFunction;
}

export interface Hypertext {
    tag: string;
    className: string;
    style: IObject<any>;
    attributes: object;
    children: Hypertext[];
}
export interface Rect {
    top: number;
    left: number;
    bottom: number;
    right: number;
    width: number;
    height: number;
}

export interface Point {
    pos1: number[];
    pos2: number[];
    pos3: number[];
    pos4: number[];
}

/**
 * @memberof Selecto
 * @typedef
 * @property - selected elements
 * @property - added elements
 * @property - removed elements
 * @property - Rect of Selection Element
 * @property - inputEvent
 */
export interface OnSelect {
    selected: Array<HTMLElement | SVGElement>;
    added: Array<HTMLElement | SVGElement>;
    removed: Array<HTMLElement | SVGElement>;
    rect: Rect;
    inputEvent: any;
}
/**
 * @memberof Selecto
 * @extends Selecto.OnSelect
 * @typedef
 * @property - after added elements
 * @property - after removed elements
 * @property - isDragStart
 * @property - is double click
 */
export interface OnSelectEnd extends OnSelect {
    afterAdded: Array<HTMLElement | SVGElement>;
    afterRemoved: Array<HTMLElement | SVGElement>;
    isDragStart: boolean;
    isDouble: boolean;
}

export interface OnDragEvent {
    datas: IObject<any>;
    clientX: number;
    clientY: number;
    deltaX: number;
    deltaY: number;
    distX: number;
    distY: number;
    isDouble?: boolean;
    inputEvent: any;
}
export interface OnKeyEvent {
}
export interface OnScroll {
    container: HTMLElement;
    direction: number[];
}
/**
 * @memberof Selecto
 * @typedef
 * @property - Stop all events
 */
export interface OnDragStart extends OnParentDragStart {
    stop(): void;
}
/**
 * @memberof Selecto
 * @typedef
 * @property - Rect of Selection Element
 * @property - Whether it is in select
 */
export interface OnDrag extends OnParentDrag {
    rect: Rect;
    isSelect: boolean;
}
/**
 * @memberof Selecto
 * @typedef
 * @property - Rect of Selection Element
 * @property - Whether it is in select
 */
export interface OnDragEnd extends OnParentDragEnd {
    rect: Rect;
    isSelect: boolean;
}
export interface SelectoEvents {
    dragStart: OnDragStart;
    drag: OnDrag;
    dragEnd: OnDragEnd;
    selectStart: OnSelect;
    select: OnSelect;
    selectEnd: OnSelectEnd;
    keydown: OnKeyEvent;
    keyup: OnKeyEvent;
    scroll: OnScroll;
}
export type SelectoProperties = { [P in typeof PROPERTIES[number]]: SelectoOptions[P] };
export type SelectoMethods = { [P in typeof METHODS[number]]: Selecto[P] };
export type getElementRectFunction = (el: HTMLElement | SVGElement) => PointArea;
export interface PointArea {
    pos1: number[];
    pos2: number[];
    pos3: number[];
    pos4: number[];
}
