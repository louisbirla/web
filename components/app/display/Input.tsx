import { Input } from "@chakra-ui/core"
import { InputArgs } from "display-api"

export const InputComponent: React.FC<InputArgs> = ({ initial_value, name, label, type }) => {
	return (
		<>
			<Input
				onChange={(e) => localStorage.setItem(`loop_davar_${name}`, e.target.value)}
				bg='white'
				defaultValue={initial_value}
				name={name}
				type={type}
				placeholder={label}
			/>
		</>
	)
}
