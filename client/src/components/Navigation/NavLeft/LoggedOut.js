import React, {useContext} from 'react'
import { UserContext } from '../../Application'
import { Box, Button } from '@mui/material'


function LoggedOut() {

  const { setModalOpen } = useContext(UserContext);

  return (
    <Box style={{ display: "flex" }}>
					<>
						<Button
							key='Login'
							onClick={() => setModalOpen("logIn")}
							sx={{ my: 2, display: "block" }}
							size={"small"}
							color='primary'
						>
							Login
						</Button>
					</>

					<>
						<Button
							key='Register'
							onClick={() => setModalOpen("register")}
							sx={{ my: 2, display: "block", ml: 2 }}
							color='secondary'
							size='small'
						>
							Register
						</Button>
					</>
				</Box>
  )
}

export default LoggedOut