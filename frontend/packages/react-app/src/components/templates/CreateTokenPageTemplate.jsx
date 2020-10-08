import React from "react";
import AppHeader from "../molecules/AppHeader";
import CreatTokenForm from "../molecules/CreateTokenForm";

const CreateTokenPageTemplate = ({ provider, loadWeb3Modal, readOnChainData}) => (
  <div>
    <AppHeader provider={provider} loadWeb3Modal={loadWeb3Modal}/>
    <CreatTokenForm />
  </div>
)

export default CreateTokenPageTemplate
