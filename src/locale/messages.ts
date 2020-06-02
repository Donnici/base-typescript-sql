
const messages: {
	[index: string]: {
		[index: string]: {
			[index: string]: string;
		};
	};
} = {
	error404: {
		message: {
			ptBr: 'A rota não foi encontrada'
		}
	},
	error500: {
		message: {
			ptBr: 'Aconteceu um erro interno no servidor'
		}
	},
	running: {
		message: {
			ptBr: 'API rodando na porta '
		}
	},
	general: {
		readySendEmail: {
			ptBr: 'A API está pronta para enviar emails',
			en: 'Server is ready to take our messages'
		},
		sendEmail: {
			ptBr: 'Email enviado com sucesso'
		},
		sendEmailError: {
			ptBr: 'Não foi possivel enviar o email, tente novamente mais tarde'
		}
	},
	detail: {
		notFound: {
			ptBr: 'Não foi encontrado nenhum elemento com esse id'
		}
	},
	store: {
		notCreate: {
			ptBr: 'Não foi possivel criar o item'
		}
	},
	modernize: {
		notFound: {
			ptBr: 'Não foi encontrado nenhum elemento com esse id'
		},
		success: {
			ptBr: 'Item atualizado com sucesso'
		},
		error: {
			ptBr: 'Ocorreu um erro interno ao atualizar o item'
		}
	},
	delete: {
		notFound: {
			ptBr: 'Não foi encontrado nenhum elemento com esse id'
		},
		success: {
			ptBr: 'Item excluido com sucesso'
		},
		error: {
			ptBr: 'Ocorreu um erro interno ao excluir o item'
		}
	},
	// Form
	fields: {
		isRequired: {
			ptBr: 'Não foram informados todos os campos obrigatórios'
		}
	},
	yupValidation: {
		typeString: {
			ptBr: 'O tipo do campo deve ser texto'
		},
		typeNumber: {
			ptBr: 'O tipo do campo deve ser numérico'
		},
		typeBoolean: {
			ptBr: 'O tipo do campo deve ser boleano (true/false)'
		},
		required: {
			ptBr: 'O campo é obrigatótio'
		},
		isEmail: {
			ptBr: 'O campo deve está no formato de um email válido'
		},
		positiveNumber: {
			ptBr: 'O número informado deve ser positivo'
		},
		integerNumber: {
			ptBr: 'O número informado deve ser inteiro'
		},
		origin: {
			ptBr: "O valor do campo deve ser um doas seguintes: 'ALM', 'TIM', 'GSTI'"
		}
	}
};

export default messages;
