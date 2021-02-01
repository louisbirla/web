import { MethodObject } from "display-api"
import { gql } from "urql"
import { client } from "../../pages/_app"

declare global {
	interface Window {
		loop_method_vars?: {
			[varname: string]: string
		}
	}
}

export const setMethodVar = (name: string, value: string) => {
	if (window.loop_method_vars == undefined) {
		window.loop_method_vars = {}
	}
	window.loop_method_vars[name] = value
	return window.loop_method_vars
}

export const getMethodVar = (name: string) => {
	return window.loop_method_vars ? window.loop_method_vars[name] : undefined
}

export const getMethodVars = () => {
	return window.loop_method_vars || {}
}

export const populate_template = (template: string) => {
	let input = template
	let vars = template.match(/\$\[[\w\d]+\]\$/g)
	if (vars) {
		vars.forEach((wrappedName: string) => {
			const name = wrappedName.replace(/[\$\[\]]/g, "")
			const value = getMethodVar(name) || ""
			if (value) {
				input = input.replace(wrappedName, JSON.stringify(value))
			}
		})
	}
	return input
}

const BlockMethodMutation = gql`
	mutation($type: String!, $blockId: Int!, $methodName: String!, $args: String!) {
		blockMethod(type: $type, blockId: $blockId, methodName: $methodName, args: $args) {
			id
		}
	}
`

type BlockMethodReturn = { blockMethod: { id: number } }
type BlockMethodVars = {
	type: string
	blockId: number
	methodName: string
	args: string
}

export const blockMethod = async (method: MethodObject) => {
	const args = populate_template(method.arg_template)
	const res = await client
		.mutation<BlockMethodReturn, BlockMethodVars>(BlockMethodMutation, {
			type: method.type,
			blockId: parseInt(method.block_id),
			methodName: method.method_name,
			args,
		})
		.toPromise()
	return res
}
