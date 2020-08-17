import React from 'react';
import { PlanRepresentation } from "./types";
import { observable } from "mobx";
import { Component } from "react";
import { observer } from "mobx-react";
import { Stack, Text, Link, FontWeights } from '@fluentui/react';

export class TerraformPlanInReviewCtorFields {
    @observable
    rawPlan!: PlanRepresentation;
}

export interface TerraformPlanInReview extends TerraformPlanInReviewCtorFields {}

export class TerraformPlanInReview {
    constructor(opts: TerraformPlanInReviewCtorFields) {
        Object.assign(this, opts);
    }
}

@observer
export class TerraformPlanInReviewUI extends Component<{plan: TerraformPlanInReview}> {
    render() {
        const {plan} = this.props;
        return <>
            <p>Version: {plan.rawPlan.format_version}</p>
            <p>Unknowns: {Object.keys(plan.rawPlan.proposed_unknown.outputs)}</p>
        </>;
    }

}
