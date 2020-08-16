type TODO = any;

type VersionString = string;

/** output of terraform show -json <stateFile> */
interface StateRepresentation {
    values: ValuesRepresentation;
    terraform_version: VersionString;
}

/** output of terraform show -json <planFile> */
interface PlanRepresentation {
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

type VarValue = TODO;

interface ValuesRepresentation {
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

interface ConfigurationRepresentation {

}

interface ExpressionRepresentation {

}

interface BlockExpressionsRepresentation {

}

interface ChangeRepresentation {
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