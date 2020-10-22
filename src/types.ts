export type TODO = any;

export type VersionString = string;

export type FormatVersion = '0.1';
export type TerraformVersion = string;

/** output of terraform show -json <stateFile> */
export interface StateRepresentation {
    format_version: FormatVersion;
    values: ValuesRepresentation;
    terraform_version: VersionString;
}

/** output of terraform show -json <planFile> */
export interface PlanRepresentation {
    terraform_version: TerraformVersion;
    format_version: FormatVersion;
    prior_state: StateRepresentation;
    configuration: ConfigurationRepresentation;
    planned_values: ValuesRepresentation;
    // All values are either true or false, depending on if it's known or not
    proposed_unknown?: ValuesRepresentation;
    variables: Record<string, { value: VarValue }>;
    resource_changes: Array<
        Pick<
            ValuesRepresentation.Resource,
            'mode' | 'type' | 'name' | 'index' | 'address' |
            'provider_name'
        > &
        {
            module_address?: string;
            deposed?: string;
            change: ChangeRepresentation;
        }
    >;
    output_changes?: Record<string, {
        change: ChangeRepresentation;
    }>;
}

export type VarValue = TODO;

export interface ValuesRepresentation {
    outputs?: Record<string, {
        value: VarValue;
        sensitive: boolean;
    }>;
    root_module: ValuesRepresentation.Module;
}

namespace ValuesRepresentation {
    export interface Resource {
        address: string;
        mode: 'managed' | 'data';
        type: string;
        name: string;
        index?: number;
        provider_name: string;
        schema_version: 2 | 1 | 0;
        values: Record<string, TODO>;
    }
    export interface Module {
        resources?: Array<ValuesRepresentation.Resource>;
        child_modules?: Array<ValuesRepresentation.AddressedModule>;
    }
    export interface AddressedModule extends Module {
        address: string;
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
    after_unknown?: ValueRepresentation;
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

export type ValueRepresentation = object;
// export interface ValueRepresentation {
//     mode?: TODO;
//     name?: TODO;
//     type?: TODO;
//     index?: TODO;
// }
