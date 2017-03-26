import {Inject, Injectable} from "@angular/core";
import {DOCUMENT} from "@angular/platform-browser";
import {MyEventManagerPlugin} from "../__util/event-manager-plugin";

/**
 * Register multiple event listeners
 *
 * Usage:
 * <button (multi.focus,select)="foo($event)"></button>
 *
 */
@Injectable()
export class MultiEventPlugin extends MyEventManagerPlugin {

    constructor(@Inject(DOCUMENT) doc: any) {
        super(doc)
    }

    supports(eventName: string): boolean {
        return eventName.indexOf('multi.') === 0;
    }

    addEventListener(element: HTMLElement, eventName: string, handler: Function): Function {

        const eventNames = eventName.slice(6).split(',');

        const eventListeners = eventNames.map(x =>
            this.manager.addEventListener(element, x, handler));

        return () => {
            eventListeners.forEach(x => x());
        }
    }
}
