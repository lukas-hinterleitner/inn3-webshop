import {Component, Directive, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

/**
 * A class that automatically unsubscribes all observables when
 * the object gets destroyed
 */

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class UnsubscribeOnDestroyAdapter implements OnDestroy {
    protected subscriptions: Set<Subscription>;

    protected constructor() {
        this.subscriptions = new Set<Subscription>();
    }

    /**
     * The lifecycle hook that unsubscribes all subscriptions
     * when the component / object gets destroyed
     */
    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
    }
}
