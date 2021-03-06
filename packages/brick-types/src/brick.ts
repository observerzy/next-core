interface CustomEventListener<T extends string, D> {
  addEventListener(type: T, listener: (evt: CustomEvent<D>) => void): void;
}

interface CustomEventListener2<T1 extends string, D1, T2 extends string, D2> {
  addEventListener(type: T1, listener: (evt: CustomEvent<D1>) => void): void;

  addEventListener(type: T2, listener: (evt: CustomEvent<D2>) => void): void;
}
interface CustomEventListener3<
  T1 extends string,
  D1,
  T2 extends string,
  D2,
  T3 extends string,
  D3
> {
  addEventListener(type: T1, listener: (evt: CustomEvent<D1>) => void): void;

  addEventListener(type: T2, listener: (evt: CustomEvent<D2>) => void): void;

  addEventListener(type: T3, listener: (evt: CustomEvent<D3>) => void): void;
}

/** @internal */
export type OmitListener<T> = Pick<T, Exclude<keyof T, "addEventListener">>;

/** @internal */
export interface BrickRender {
  _render(): void;
}

/** @internal */
export enum BrickEvent {
  READ_SORTING_CHANGE = "read.sorting.change",
  READ_SEARCH_CHANGE = "read.search.change",
  READ_ADVANCED_SEARCH_CHANGE = "read.advancedSearch.change",
  READ_PAGINATION_CHANGE = "read.pagination.change",
  READ_SELECTION_CHANGE = "read.selection.change",
  READ_RELATED_TO_ME_CHANGE = "read.relatedToMe.change",
  READ_ALIVE_HOSTS_CHANGE = "read.alive.hosts.change",
  READ_CATEGORY_CHANGE = "read.category.change",
  READ_MULTIPLE_CLICK_ITEM = "read.multiple.clickItem",
  READ_MULTIPLE_CREATE = "read.multiple.create",
  CREATE_SINGLE_SUCCESS = "create.single.success",
  CREATE_SINGLE_FAILED = "create.single.failed",
  CREATE_SINGLE_CANCELED = "create.single.canceled",
  CREATE_SINGLE_NEXT = "create.single.next",
  CREATE_SINGLE_SELECT = "create.single.select",
  UPDATE_SINGLE_SUCCESS = "update.single.success",
  UPDATE_SINGLE_FAILED = "update.single.failed",
  UPDATE_SINGLE_CANCELED = "update.single.canceled",
  DELETE_SINGLE_SUCCESS = "delete.single.success",
  DELETE_SINGLE_FAILED = "delete.single.failed",
  DELETE_SINGLE_CANCELED = "delete.single.canceled",
  CREATE_MULTI_SUCCESS = "create.multi.success",
  CREATE_MULTI_FAILED = "create.multi.failed",
  CREATE_MULTI_CANCELED = "create.multi.canceled",
  DELETE_MULTI_SUCCESS = "delete.multi.success",
  DELETE_MULTI_CANCELED = "delete.multi.canceled",
  UPDATE_MULTI_SUCCESS = "update.multi.success",
  UPDATE_MULTI_CANCELED = "update.multi.canceled",
  UPDATE_MULTI_FAILED = "update.multi.failed",
  UPDATE_SINGLE_SELECT = "update.single.select",
  UPDATE_SINGLE_SELECTED = "update.single.selected",
  READ_CARD_LEFT_BTN_CLICK = "read.card.leftBtn.click",
  READ_CARD_RIGHT_BTN_CLICK = "read.card.rightBtn.click",
}

/** @internal */
export interface BrickOfReadPresetConfigs<T = any> {
  presetConfigs: T;
}

/** @internal */
export interface ReadSortingChangeDetail {
  sort?: string;
  asc?: boolean;
}

/** @internal */
export interface BrickOfReadSorting
  extends CustomEventListener<
      BrickEvent.READ_SORTING_CHANGE,
      ReadSortingChangeDetail
    >,
    ReadSortingChangeDetail {}

/** @internal */
export interface ReadSearchChangeDetail {
  q: string;
}

/** @internal */
export interface BrickOfReadSearch
  extends CustomEventListener<
      BrickEvent.READ_SEARCH_CHANGE,
      ReadSearchChangeDetail
    >,
    ReadSearchChangeDetail {
  searchDisabled?: boolean;
}

/** @internal */
export interface ReadSearchCategoryDetail {
  selected: string;
}

/** @internal */
export interface BrickOfCategorySearch
  extends CustomEventListener<
      BrickEvent.READ_CATEGORY_CHANGE,
      ReadSearchCategoryDetail
    >,
    ReadSearchCategoryDetail {}

/** @internal */
export interface ReadAdvancedSearchChangeDetail<T = Record<string, any>> {
  aq: T;
}

/** @internal */
export interface BrickOfReadAdvancedSearch<T = Record<string, any>>
  extends CustomEventListener<
      BrickEvent.READ_ADVANCED_SEARCH_CHANGE,
      ReadAdvancedSearchChangeDetail<T>
    >,
    ReadAdvancedSearchChangeDetail<T> {
  advancedSearchDisabled?: boolean;
}

/** @internal */
export interface ReadPaginationChangeDetail {
  page?: number;
  pageSize?: number;
}

/** @internal */
export interface BrickOfReadPagination
  extends CustomEventListener<
      BrickEvent.READ_PAGINATION_CHANGE,
      ReadPaginationChangeDetail
    >,
    ReadPaginationChangeDetail {}

/** @internal */
export interface ReadSelectionChangeDetail<T = any> {
  selectedKeys?: string[] | number[];
  selectedItems?: T[];
}

/** @internal */
export interface BrickOfReadSelection<T = any>
  extends CustomEventListener<
      BrickEvent.READ_SELECTION_CHANGE,
      ReadSelectionChangeDetail<T>
    >,
    ReadSelectionChangeDetail<T> {}

/** @internal */
export interface BrickOfHandleReadSelection<T = any>
  extends ReadSelectionChangeDetail<T> {
  handleReadSelection(e: CustomEvent<ReadSelectionChangeDetail>): void;
}

/** @internal */
export interface ReadMultipleClickItemDetail {
  id: string;
}

/** @internal */
export interface BrickOfReadMultiple
  extends CustomEventListener<
    BrickEvent.READ_MULTIPLE_CLICK_ITEM,
    ReadMultipleClickItemDetail
  > {
  detailUrlTemplates?: Record<string, string>;
}

/** @internal */
export interface ReadClickCardBtnDetail {
  data: { instanceId: string; objectId: string };
}

/** @internal */
export interface BrickOfCardLeftBtnClick
  extends CustomEventListener<
    BrickEvent.READ_CARD_LEFT_BTN_CLICK,
    ReadClickCardBtnDetail
  > {
  data: { instanceId: string; objectId: string };
}

/** @internal */
export interface BrickOfCardRightBtnClick
  extends CustomEventListener<
    BrickEvent.READ_CARD_RIGHT_BTN_CLICK,
    ReadClickCardBtnDetail
  > {
  data: { instanceId: string; objectId: string };
}

/** @internal */
export interface ReadRelatedToMeChangeDetail {
  relatedToMe?: boolean;
}

/** @internal */
export interface ReadAliveHostsChangeDetail {
  aliveHosts?: boolean;
}

/** @internal */
export interface BrickOfReadRelatedToMe
  extends CustomEventListener<
      BrickEvent.READ_RELATED_TO_ME_CHANGE,
      ReadRelatedToMeChangeDetail
    >,
    ReadRelatedToMeChangeDetail {
  relatedToMeDisabled?: boolean;
}

/** @internal */
export interface BrickOfReadAliveHosts
  extends CustomEventListener<
      BrickEvent.READ_ALIVE_HOSTS_CHANGE,
      ReadAliveHostsChangeDetail
    >,
    ReadAliveHostsChangeDetail {
  aliveHostsDisabled?: boolean;
}

/** @internal */
export interface BrickOfCmdbObject {
  objectId: string;
}

/** @internal */
export interface BrickOfCmdbInstance {
  instanceId: string;
}

/** @internal */
export interface AttributeConfig {
  key: string;
  isWholeLine: boolean;
}

/** @internal */
export interface CustomBrickConfig<T = Record<string, any>> {
  name: string;
  label: string;
  options?: T;
}

/** @internal */
export interface CustomComponent<T = Record<string, any>> {
  brick: string;
  field?: string;
  properties: T;
}
/** @internal */
export interface CustomComponentWrapper<T = Record<string, any>> {
  component: CustomComponent;
}

/** @internal */
export interface CustomComponentConfig<T = Record<string, any>> {
  attrId: CustomComponentWrapper;
}

/** @internal */
export interface BrickAction {
  label: string;
  type?: "button" | "dropdown";
  buttonProps?: Record<string, any>;
  isDanger?: boolean;
  url?: string;
  event?: string;
}

/** @internal */
export interface BrickOfCmdbInstanceDetail<T = Record<string, any>> {
  attributeKeys: string[];
  attributeConfigs: Record<string, AttributeConfig>;
  brickConfigList: CustomBrickConfig<T>[];
  actions: BrickAction[];
  attrCustomConfigs: CustomComponentConfig<T>;
}

/** @internal */
export interface BrickOfCmdbInstanceRelation {
  relationSideId: string;
}

/** @internal */
export interface BrickOfReadPropertiesCustomDisplay {
  propertyDisplayConfigs?: PropertyDisplayConfig[];
}

/** @internal */
export type BrickOfCreateSingle<
  S = any,
  F = any,
  C = any
> = CustomEventListener3<
  BrickEvent.CREATE_SINGLE_SUCCESS,
  S,
  BrickEvent.CREATE_SINGLE_FAILED,
  F,
  BrickEvent.CREATE_SINGLE_CANCELED,
  C
>;

/** @internal */
export type BrickOfUpdateSingle<
  S = any,
  F = any,
  C = any
> = CustomEventListener3<
  BrickEvent.UPDATE_SINGLE_SUCCESS,
  S,
  BrickEvent.UPDATE_SINGLE_FAILED,
  F,
  BrickEvent.UPDATE_SINGLE_CANCELED,
  C
>;

/** @internal */
export type BrickOfDeleteSingle<
  S = any,
  F = any,
  C = any
> = CustomEventListener3<
  BrickEvent.DELETE_SINGLE_SUCCESS,
  S,
  BrickEvent.DELETE_SINGLE_FAILED,
  F,
  BrickEvent.DELETE_SINGLE_CANCELED,
  C
>;

/** @internal */
export type BrickOfDeleteMultiple<S = any, C = any> = CustomEventListener2<
  BrickEvent.DELETE_MULTI_SUCCESS,
  S,
  BrickEvent.DELETE_MULTI_CANCELED,
  C
>;

/** @internal */
export enum PropertyDisplayType {
  Tag = "tag",
}

/** @internal */
export interface PropertyDisplayConfig {
  key: string;
  type?: PropertyDisplayType;
  brick?: string;
  valueColorMap?: Record<string, string>;
  properties?: Record<string, any>;
}

/** @internal */
export interface CustomDisplay<T = any, O = Record<string, any>> {
  value: T;
  options: O;
}

/** @internal */
export interface InstanceDisplay<T = Record<string, any>> {
  object: T;
}

/** @internal */
export interface PropertyDisplay {
  key: string;
  isPrimary?: boolean;
}

/** @internal */
export type BrickOfUpdateMultiple<S = any, C = any> = CustomEventListener2<
  BrickEvent.UPDATE_MULTI_SUCCESS,
  S,
  BrickEvent.UPDATE_MULTI_CANCELED,
  C
>;

/** @internal */
export interface CategoryConfig {
  field: string;
  theme?: "button" | "tag";
  showCount?: number;
  pageSize?: number;
}
/** @internal */
export interface CardConfig {
  title?: {
    field?: string;
    content?: string;
  };
  fields?: string[];
  icon?: {
    name: string;
    style?: Record<string, string>;
  };
  btnLeft?: {
    text: string;
    style?: Record<string, string>;
  };
  btnRight?: {
    text: string;
    style?: Record<string, string>;
  };
  badge?: {
    field: string;
    default: {
      text: string;
      style?: Record<string, string>;
    };
    custom?: Record<
      string,
      {
        text: string;
        style?: Record<string, string>;
      }
    >;
  };
  brick?: string;
}

/** @internal */
export interface BrickOfCmdbCardList {
  column?: number;
  columnWidth?: number;
  card?: CardConfig;
  category?: CategoryConfig;
  showStatistics?: boolean;
  selectedCategory: string;
}

/** @internal */
export interface BrickOfCmdbCard<
  T = Record<string, any>,
  O = Record<string, any>
> {
  instance: T;
  object?: O;
  objectId?: string;
  detailUrl?: string;
}

/** @internal */
export interface BrickOfModal<T = Record<string, any>> {
  closeOnOk?: boolean;
  isVisible: boolean;
  destroyOnClose: boolean;
  modalTitle?: React.ReactNode;
  modalWidth?: number;
  open(e?: CustomEvent<T>): void;
  close(): void;
  destroy(): void;
  reset?(): void;
}
/** @internal */
export type BrickOfBatchSetPermissions<S = any, F = any> = CustomEventListener2<
  BrickEvent.UPDATE_MULTI_SUCCESS,
  S,
  BrickEvent.UPDATE_MULTI_FAILED,
  F
>;

/** @internal */
export interface BrickOfFeatures<
  T = Record<string, Record<string, any> | boolean>
> {
  features: T;
}
