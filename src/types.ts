export type TODO = any;

export type VersionString = string;

/** output of terraform show -json <stateFile> */
export interface StateRepresentation {
    values: ValuesRepresentation;
    terraform_version: VersionString;
}

/** output of terraform show -json <planFile> */
export interface PlanRepresentation {
    format_version: '0.1';
    prior_state: StateRepresentation;
    configuration: ConfigurationRepresentation;
    planned_values: ValuesRepresentation;
    // All values are either true or false, depending on if it's known or not
    proposed_unknown: ValuesRepresentation;
    variables: Record<string, { value: VarValue }>;
    resource_changes: Array<
        Pick<ValueRepresentation,
            'mode' | 'type' | 'name' | 'index'> &
        {
            address: string;
            module_address?: string;
            deposed?: string;
            change: ChangeRepresentation;
        }
    >;
    output_changes: Record<string, {
        change: ChangeRepresentation;
    }>;
}

export type VarValue = TODO;

export interface ValuesRepresentation {
    outputs: Record<string, {
        value: VarValue;
        sensitive: boolean;
    }>;
    root_module: {
        resources: Array<ValuesRepresentation.Resource>;
        child_modules: Array<ValuesRepresentation.ChildModule>;
    }
}

namespace ValuesRepresentation {
    export interface Resource {
        address: string;
        mode: 'managed' | 'data';
        type: string;
        name: string;
        index?: number;
        provider_name: string;
        schema_version: 2 | number;
        values: any;
    }
    export interface ChildModule {
        address: string;
        resources: Array<ValuesRepresentation.Resource>;
        child_modules?: Array<ValuesRepresentation.ChildModule>;
    }
}

export interface ConfigurationRepresentation {

}

export interface ExpressionRepresentation {

}

export interface BlockExpressionsRepresentation {

}

export interface ChangeRepresentation {
    actions: ChangeRepresentation.Actions;
    before?: ValueRepresentation;
    after?: ValueRepresentation;
}
namespace ChangeRepresentation {
    export type Actions =
        ['no-op'] |
        ['create'] |
        ['read'] |
        ['update'] | 
        ['delete', 'create'] |
        ['create', 'delete'] |
        ['delete'];
}

export interface ValueRepresentation {
    mode?: TODO;
    name?: TODO;
    type?: TODO;
    index?: TODO;
}
