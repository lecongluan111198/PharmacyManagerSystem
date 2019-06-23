/** Declaration file generated by dts-gen */

export function createTooltip(el: any, value: any, ...args: any[]): any;

export function destroyTooltip(el: any): void;

export function install(Vue: any, ...args: any[]): void;

export namespace VClosePopover {
    function bind(el: any, _ref: any): void;

    function unbind(el: any): void;

    function update(el: any, _ref2: any): void;

}

export namespace VPopover {
    const components: {
        ResizeObserver: {
            beforeDestroy: any;
            methods: {
                addResizeHandlers: any;
                compareAndNotify: any;
                removeResizeHandlers: any;
            };
            mounted: any;
            name: string;
            render: any;
            staticRenderFns: any[];
        };
    };

    const name: string;

    const props: {
        autoHide: {
            default: any;
            type: any;
        };
        boundariesElement: {
            default: any;
            type: any[];
        };
        container: {
            default: any;
            type: any[];
        };
        delay: {
            default: any;
            type: any[];
        };
        disabled: {
            default: boolean;
            type: any;
        };
        handleResize: {
            default: any;
            type: any;
        };
        offset: {
            default: any;
            type: any[];
        };
        open: {
            default: boolean;
            type: any;
        };
        openClass: {
            default: any;
            type: any[];
        };
        openGroup: {
            default: any;
            type: any;
        };
        placement: {
            default: any;
            type: any;
        };
        popoverArrowClass: {
            default: any;
            type: any[];
        };
        popoverBaseClass: {
            default: any;
            type: any[];
        };
        popoverClass: {
            default: any;
            type: any[];
        };
        popoverInnerClass: {
            default: any;
            type: any[];
        };
        popoverWrapperClass: {
            default: any;
            type: any[];
        };
        popperOptions: {
            default: any;
            type: any;
        };
        trigger: {
            default: any;
            type: any;
        };
    };

    const staticRenderFns: any[];

    function beforeDestroy(): void;

    function created(): void;

    function data(): any;

    function deactivated(): void;

    function mounted(): void;

    function render(): any;

    namespace computed {
        function cssClass(): any;

        function popoverId(): any;

    }

    namespace methods {
        function $_addEventListeners(): any;

        function $_findContainer(container: any, reference: any): any;

        function $_getOffset(): any;

        function $_handleGlobalClose(event: any, ...args: any[]): void;

        function $_handleResize(): void;

        function $_hide(): void;

        function $_init(): void;

        function $_removeEventListeners(): void;

        function $_restartPopper(): void;

        function $_scheduleHide(...args: any[]): void;

        function $_scheduleShow(...args: any[]): void;

        function $_setTooltipNodeEvent(event: any): any;

        function $_show(): void;

        function $_updatePopper(cb: any): void;

        function dispose(): void;

        function hide(...args: any[]): void;

        function show(...args: any[]): void;

    }

    namespace watch {
        const boundariesElement: string;

        const offset: string;

        const popperOptions: {
            deep: boolean;
            handler: string;
        };

        function container(val: any): void;

        function disabled(val: any, oldVal: any): void;

        function open(val: any): void;

        function placement(val: any): void;

        function trigger(val: any): void;

    }

}

export namespace VTooltip {
    const options: {
        autoHide: boolean;
        defaultArrowSelector: string;
        defaultBoundariesElement: any;
        defaultClass: string;
        defaultContainer: string;
        defaultDelay: number;
        defaultHideOnTargetClick: boolean;
        defaultHtml: boolean;
        defaultInnerSelector: string;
        defaultLoadingClass: string;
        defaultLoadingContent: string;
        defaultOffset: number;
        defaultPlacement: string;
        defaultPopperOptions: {
        };
        defaultTargetClass: string;
        defaultTemplate: string;
        defaultTrigger: string;
        disposeTimeout: number;
        popover: {
            defaultArrowClass: string;
            defaultAutoHide: boolean;
            defaultBaseClass: string;
            defaultBoundariesElement: any;
            defaultClass: string;
            defaultContainer: string;
            defaultDelay: number;
            defaultHandleResize: boolean;
            defaultInnerClass: string;
            defaultOffset: number;
            defaultOpenClass: string;
            defaultPlacement: string;
            defaultPopperOptions: {
            };
            defaultTrigger: string;
            defaultWrapperClass: string;
        };
    };

    function bind(el: any, _ref: any): void;

    function unbind(el: any): void;

    function update(el: any, _ref: any): void;

}

