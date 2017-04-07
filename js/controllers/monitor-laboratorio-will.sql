<?php
session_start();
header("Pragma: no-cache");
header("Content-Type: text/html; charset=ISO-8859-1",true);
require_once "../aLibrary/z_ConexBancos.php";
require_once "../aLibrary/z_verificando.php";
require_once "../aLibrary/z_functions.php";

ini_set('max_execution_time', 300); 
ini_set('memory_limit', '1024M');

$sqlTextD = "SELECT TO_CHAR(sysdate, 'dd/mm/yyyy') AS data_agora, TO_CHAR(sysdate, 'dd') dia_agora, TO_CHAR(sysdate, 'mm/yyyy') mes_agora, 
TO_CHAR(sysdate, 'yy') ano_agora, TO_CHAR(sysdate, 'hh24') horas_agora, TO_CHAR(sysdate, 'hh24:mi:ss') hora_agora, 
TO_CHAR(sysdate, 'dd/mm/yyyy-hh24:mi:ss') datahora_agora FROM DUAL";
$queryD = $zbd->prepare($sqlTextD);
$queryD->execute();
$resultD = $queryD->fetch();

if( $_GET['down'] == "ztmDadosResProcedimentos" ){
	if( $_GET['filtro'] == "7" && $_GET['seq'] == "N" ){
		$sqlText = "SELECT 'em 7 dias', '', COALESCE(COUNT(*),0) AS exames FROM lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, 
		lab_requisicao REQ, lab_examemetodoversao EMV 
                                        WHERE DER.exa_st_codigo = EXA.exa_st_codigo 
                                        AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND REQ.req_st_codigo = DER.req_st_codigo 
                                        AND DER.exa_st_codigo = EMV.exa_st_codigo 
                                        AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade 
                                        AND EMV.emv_ch_ativo = 'S' 
                                        AND UUN.usu_st_codigo = :usu_st_codigo 
                                        AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro > TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro AND DER.leg_st_codigo != '013' 
		UNION ALL 
		SELECT 'Mês TT', TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, COALESCE(SUM(COUNT(*)),0) AS exames 
		FROM lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_requisicao REQ, lab_examemetodoversao EMV 
		WHERE DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo 
		AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' 
		AND UUN.usu_st_codigo = :usu_st_codigo AND REQ.req_st_codigo = DER.req_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE('01'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro,'mm/yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= LAST_DAY(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro) AND DER.leg_st_codigo != '013' 
		GROUP BY REQ.req_dt_cadastro
		UNION ALL 
		SELECT 'Hoje OK', '', COALESCE(COUNT(*),0) AS exames 
		FROM lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_requisicao REQ, lab_examemetodoversao EMV 
		WHERE DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo 
		AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' 
		AND UUN.usu_st_codigo = :usu_st_codigo AND REQ.req_st_codigo = DER.req_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro > TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro AND DER.leg_st_codigo IN ('011','016') 
		UNION ALL 
		SELECT 'Mês OK', TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, COALESCE(SUM(COUNT(*)),0) AS exames 
		FROM lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_requisicao REQ, lab_examemetodoversao EMV 
		WHERE DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo 
		AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' 
		AND UUN.usu_st_codigo = :usu_st_codigo AND REQ.req_st_codigo = DER.req_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE('01'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro,'mm/yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= LAST_DAY(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro) AND DER.leg_st_codigo IN ('011','016') 
		GROUP BY REQ.req_dt_cadastro";
	}else if( $_GET['filtro'] == "30" ){
		$sqlText = "SELECT 'Mês TT', COALESCE(SUM(COUNT(*)),0) AS exames FROM lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, 
		lab_requisicao REQ, lab_examemetodoversao EMV WHERE DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE('01'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'mm/yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= LAST_DAY(TO_DATE(:data_inicial,'dd/mm/yyyy')) AND DER.leg_st_codigo != '013' 
		GROUP BY REQ.req_dt_cadastro
		UNION ALL 
		SELECT 'Ano TT', COALESCE(SUM(COUNT(*)),0) AS exames FROM lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_requisicao REQ, 
		lab_examemetodoversao EMV WHERE DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE('01/01/'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= TO_DATE('31/12/'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'yyyy'),'dd/mm/yyyy') AND DER.leg_st_codigo != '013' 
		GROUP BY REQ.req_dt_cadastro
		UNION ALL 
		SELECT 'Mês OK', COALESCE(SUM(COUNT(*)),0) AS exames FROM lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_requisicao REQ, 
		lab_examemetodoversao EMV WHERE DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= "  AND REQ.req_dt_cadastro >= TO_DATE('01'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'mm/yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= TO_DATE('31/12/'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'yyyy'),'dd/mm/yyyy') 
		AND DER.leg_st_codigo IN ('011','016') GROUP BY REQ.req_dt_cadastro 
		UNION ALL 
		SELECT 'Ano OK', COALESCE(SUM(COUNT(*)),0) AS exames FROM lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_requisicao REQ, 
		lab_examemetodoversao EMV WHERE DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE('01/01/'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= TO_DATE('31/12/'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'yyyy'),'dd/mm/yyyy') 
		AND DER.leg_st_codigo IN ('011','016') GROUP BY REQ.req_dt_cadastro";
	}else if( $_GET['filtro'] == "180" ){
		$linhasFor = 6;
		$sqlText = "SELECT 'Mês TT', COALESCE(SUM(COUNT(*)),0) AS exames FROM lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, 
		lab_requisicao REQ, lab_examemetodoversao EMV WHERE DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TRUNC((SELECT TO_DATE(:data_inicial,'dd/mm/yyyy') - 180 FROM dual))
		AND REQ.req_dt_cadastro <= TO_DATE(:data_inicial,'dd/mm/yyyy') AND DER.leg_st_codigo != '013' 
		GROUP BY REQ.req_dt_cadastro
		UNION ALL 
		SELECT 'Ano TT', COALESCE(SUM(COUNT(*)),0) AS exames FROM lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_requisicao REQ, 
		lab_examemetodoversao EMBWHERE DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE('01/01/'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= TO_DATE('31/12/'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'yyyy'),'dd/mm/yyyy') AND DER.leg_st_codigo != '013' 
		GROUP BY REQ.req_dt_cadastro
		UNION ALL 
		SELECT 'Mês OK', COALESCE(SUM(COUNT(*)),0) AS exames FROM lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_requisicao REQ, 
		lab_examemetodoversao EMV WHERE DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TRUNC((SELECT TO_DATE(:data_inicial,'dd/mm/yyyy') - 180 FROM dual))
		AND REQ.req_dt_cadastro <= TO_DATE(:data_inicial,'dd/mm/yyyy') AND DER.leg_st_codigo IN ('011','016') 
		GROUP BY REQ.req_dt_cadastro 
		UNION ALL 
		SELECT 'Ano OK', COALESCE(SUM(COUNT(*)),0) AS exames FROM lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_requisicao REQ, 
		lab_examemetodoversao EMV WHERE DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE('01/01/'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= TO_DATE('31/12/'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'yyyy'),'dd/mm/yyyy') 
		AND DER.leg_st_codigo IN ('011','016') GROUP BY REQ.req_dt_cadastro";
	}else if( $_GET['filtro'] == "365" ){
		$linhasFor = 12;
		$sqlText = "SELECT 'Ano OK', COALESCE(SUM(COUNT(*)),0) AS exames FROM lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, 
		lab_requisicao REQ, lab_examemetodoversao EMV WHERE DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE('01/01/'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= TO_DATE('31/12/'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'yyyy'),'dd/mm/yyyy') AND DER.leg_st_codigo != '013' 
		GROUP BY REQ.req_dt_cadastro
		UNION ALL 
		SELECT '2Ano TT', COALESCE(SUM(COUNT(*)),0) AS exames FROM lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_requisicao REQ, 
		lab_examemetodoversao EMV WHERE DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE('01/01/'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-430,'yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= TO_DATE('31/12/'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'yyyy'),'dd/mm/yyyy') AND DER.leg_st_codigo != '013' 
		GROUP BY REQ.req_dt_cadastro
		UNION ALL 
		SELECT 'Ano OK', COALESCE(SUM(COUNT(*)),0) AS exames FROM lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_requisicao REQ, 
		lab_examemetodoversao EMV WHERE DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE('01/01/'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= TO_DATE('31/12/'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'yyyy'),'dd/mm/yyyy') 
		AND DER.leg_st_codigo IN ('011','016') 
		GROUP BY REQ.req_dt_cadastro
		UNION ALL 
		SELECT '2Ano OK', COALESCE(SUM(COUNT(*)),0) AS exames FROM lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_requisicao REQ, 
		lab_examemetodoversao EMV WHERE DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE('01/01/'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-430,'yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= TO_DATE('31/12/'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'yyyy'),'dd/mm/yyyy') AND DER.leg_st_codigo IN ('011','016') 
		GROUP BY REQ.req_dt_cadastro";
	}else{
		$sqlText = "SELECT 'Hoje TT', TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, COALESCE(COUNT(*),0) AS exames 
		FROM lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_requisicao REQ, lab_examemetodoversao EMV
		WHERE DER.exa_st_codigo = EXA.exa_st_codigo 
                                        AND DER.uni_st_codigo = UUN.uni_st_codigo 
                                        AND REQ.req_st_codigo = DER.req_st_codigo 
		AND DER.exa_st_codigo = EMV.exa_st_codigo 
                                        AND DER.met_st_codigo = EMV.met_st_codigo 
                                        AND DER.emv_dt_validade = EMV.emv_dt_validade 
		AND EMV.emv_ch_ativo = 'S' 
                                        AND UUN.usu_st_codigo = :usu_st_codigo 
                                        AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro = TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro AND DER.leg_st_codigo != '013' 
		UNION ALL 
		SELECT 'Mês TT', TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, COALESCE(SUM(COUNT(*)),0) AS exames 
		FROM lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_requisicao REQ, lab_examemetodoversao EMV 
		WHERE DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo 
		AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' 
		AND UUN.usu_st_codigo = :usu_st_codigo AND REQ.req_st_codigo = DER.req_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE('01'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro,'mm/yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= LAST_DAY(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro) AND DER.leg_st_codigo != '013' 
		GROUP BY REQ.req_dt_cadastro
		UNION ALL 
		SELECT 'Hoje OK', TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, COALESCE(COUNT(*),0) AS exames 
		FROM lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_requisicao REQ, lab_examemetodoversao EMV 
		WHERE DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo 
		AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' 
		AND UUN.usu_st_codigo = :usu_st_codigo AND REQ.req_st_codigo = DER.req_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro = TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro AND DER.leg_st_codigo IN ('011','016') 
		UNION ALL 
		SELECT 'Mês OK', TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, COALESCE(SUM(COUNT(*)),0) AS exames 
		FROM lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_requisicao REQ,lab_examemetodoversao EMV 
		WHERE DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo 
		AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo 
		AND REQ.req_st_codigo = DER.req_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE('01'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro,'mm/yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= LAST_DAY(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro) AND DER.leg_st_codigo IN ('011','016') 
		GROUP BY REQ.req_dt_cadastro";
	}
	$queryRES_TOTAL = $zbd->prepare($sqlText);
	$queryRES_TOTAL->bindValue(':cli_in_codigo', $_SESSION['ztm_id_cliente'], PDO::PARAM_INT);
	$queryRES_TOTAL->bindValue(':uni_st_codigo', $_POST['ztmMonitorUnidade'], PDO::PARAM_STR);
	$queryRES_TOTAL->bindValue(':uni_st_execucao', $_POST['ztmMonitorUnidadeExec'], PDO::PARAM_STR);
	$queryRES_TOTAL->bindValue(':data_inicial', $_POST['ztmMonitorDataRef'], PDO::PARAM_STR);
	$queryRES_TOTAL->bindValue(':data_filtro', $_GET['filtro'], PDO::PARAM_STR);
	$queryRES_TOTAL->bindValue(':usu_st_codigo', $_SESSION['ztm_usu_codigo_weblaudos'], PDO::PARAM_STR);
	$queryRES_TOTAL->execute();
	$a = 0;
	$arrayResumoExames = array(0,0,0,0);
	while( $resultRES_TOTAL = $queryRES_TOTAL->fetch() ){
		if( $resultRES_TOTAL["EXAMES"] != "" ){
			$arrayResumoExames[$a] = $resultRES_TOTAL["EXAMES"];
			if( $_GET['filtro'] == "0" && $_POST['ztmMonitorDataRef'] == $resultD["DATA_AGORA"] ){
				$resultRES_DATAS = "Hoje";
			}else{ 
				if( $_GET['filtro'] != "0" && $_GET['seq'] == "N" ){
					$resultRES_DATAS = $_GET['filtro'];
				}else{
					$resultRES_DATAS = "em ".$resultRES_TOTAL["DATAS_FILTRO"];
				}
			}
			$a++;
		}
	}
	$resultRES__EXAMES .= "_".implode("_",$arrayResumoExames);
	
	if( $_GET['filtro'] == "0" || $_GET['seq'] == "S" ){
		$linhasFor = 12;
		$sqlText = "SELECT REQ.req_dt_cadastro, TO_CHAR(REQ.req_hr_cadastro, 'hh24') AS hora, COUNT(*) AS exames FROM lab_requisicao REQ, 
		lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_examemetodoversao EMV WHERE REQ.req_st_codigo = DER.req_st_codigo 
		AND DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo 
		AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' 
		AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro AND DER.leg_st_codigo != '013' 
		GROUP BY REQ.req_dt_cadastro, TO_CHAR(REQ.req_hr_cadastro, 'hh24') ORDER BY 1 ASC, 2 ASC";
		$queryRES_EXAME = $zbd->prepare($sqlText);
		$queryRES_EXAME->bindValue(':cli_in_codigo', $_SESSION['ztm_id_cliente'], PDO::PARAM_INT);
		$queryRES_EXAME->bindValue(':uni_st_codigo', $_POST['ztmMonitorUnidade'], PDO::PARAM_STR);
		$queryRES_EXAME->bindValue(':uni_st_execucao', $_POST['ztmMonitorUnidadeExec'], PDO::PARAM_STR);
		$queryRES_EXAME->bindValue(':data_inicial', $_POST['ztmMonitorDataRef'], PDO::PARAM_STR);
		$queryRES_EXAME->bindValue(':data_filtro', (1+$_GET['filtro']), PDO::PARAM_STR);
		$queryRES_EXAME->bindValue(':usu_st_codigo', $_SESSION['ztm_usu_codigo_weblaudos'], PDO::PARAM_STR);
		$queryRES_EXAME->execute();

		$arrayHorasExames = array();
		$arrayHoras = array("00"=>"00|0","01"=>"01|0","02"=>"02|0","03"=>"03|0","04"=>"04|0","05"=>"05|0","06"=>"06|0","07"=>"07|0","08"=>"08|0","09"=>"09|0","10"=>"10|0","11"=>"11|0","12"=>"12|0","13"=>"13|0","14"=>"14|0","15"=>"15|0","16"=>"16|0","17"=>"17|0","18"=>"18|0","19"=>"19|0","20"=>"20|0","21"=>"21|0","22"=>"22|0","23"=>"23|0");
		while( $resultRES_EXAME = $queryRES_EXAME->fetch() ){
			$arrayHoras[$resultRES_EXAME["HORA"]] = $resultRES_EXAME["HORA"]."|".$resultRES_EXAME["EXAMES"];
		}
		foreach ($arrayHoras as $i => $banco) {
			if( $i == $resultD["HORAS_AGORA"] ){
				break;
			}
		}
		for( $i=0; $i < 12; $i++ ){
			$saida = prev($arrayHoras);
			if( $saida == "" ){
				$saida = end($arrayHoras);
			}
			$arrayHorasExames[$i] = $saida;
		}
		foreach (array_reverse($arrayHorasExames) as $banco) {
			$ss = explode("|",$banco);
			$_s1 .= $ss[0]."h|";
			$_s2 .= $ss[1]."|";
		}
	}else if( $_GET['filtro'] == "7" || $_GET['filtro'] == "30" ){
		$linhasFor = $_GET['filtro'];
		$sqlText = "SELECT REQ.req_dt_cadastro, TO_CHAR(REQ.req_dt_cadastro, 'dd') AS dia, COUNT(*) AS exames FROM lab_requisicao REQ, 
		lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_examemetodoversao EMV WHERE REQ.req_st_codigo = DER.req_st_codigo 
		AND DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo 
		AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' 
		AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro > TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro AND DER.leg_st_codigo != '013' 
		GROUP BY REQ.req_dt_cadastro ORDER BY 1 ASC, 2 ASC";
		$queryRES_EXAME = $zbd->prepare($sqlText);
		$queryRES_EXAME->bindValue(':cli_in_codigo', $_SESSION['ztm_id_cliente'], PDO::PARAM_INT);
		$queryRES_EXAME->bindValue(':uni_st_codigo', $_POST['ztmMonitorUnidade'], PDO::PARAM_STR);
		$queryRES_EXAME->bindValue(':uni_st_execucao', $_POST['ztmMonitorUnidadeExec'], PDO::PARAM_STR);
		$queryRES_EXAME->bindValue(':data_inicial', $_POST['ztmMonitorDataRef'], PDO::PARAM_STR);
		$queryRES_EXAME->bindValue(':data_filtro', (1+$_GET['filtro']), PDO::PARAM_STR);
		$queryRES_EXAME->bindValue(':usu_st_codigo', $_SESSION['ztm_usu_codigo_weblaudos'], PDO::PARAM_STR);
		$queryRES_EXAME->execute();

		$arrayDiasExames = array();
		$arrayDias = array("01"=>"01|0","02"=>"02|0","03"=>"03|0","04"=>"04|0","05"=>"05|0","06"=>"06|0","07"=>"07|0","08"=>"08|0","09"=>"09|0","10"=>"10|0","11"=>"11|0","12"=>"12|0","13"=>"13|0","14"=>"14|0","15"=>"15|0","16"=>"16|0","17"=>"17|0","18"=>"18|0","19"=>"19|0","20"=>"20|0","21"=>"21|0","22"=>"22|0","23"=>"23|0","24"=>"24|0","25"=>"25|0","26"=>"26|0","27"=>"27|0","28"=>"28|0","29"=>"29|0","30"=>"30|0","31"=>"31|0");
		while( $resultRES_EXAME = $queryRES_EXAME->fetch() ){
			$arrayDias[$resultRES_EXAME["DIA"]] = $resultRES_EXAME["DIA"]."|".$resultRES_EXAME["EXAMES"];
		}
		foreach ($arrayDias as $i => $banco) {
			if( $i == $resultD["DIA_AGORA"] ){
				break;
			}
		}
		for( $i=0; $i < $_GET['filtro']; $i++ ){
			$saida = prev($arrayDias);
			if( $saida == "" ){
				$saida = end($arrayDias);
			}
			$arrayDiasExames[$i] = $saida;
		}
		foreach (array_reverse($arrayDiasExames) as $banco) {
			$ss = explode("|",$banco);
			$_s1 .= $ss[0]."d|";
			$_s2 .= $ss[1]."|";
		}
	}else if( $_GET['filtro'] == "180" || $_GET['filtro'] == "365" ){
		$sqlText = "SELECT TO_CHAR(REQ.req_dt_cadastro, 'mm') AS mes, TO_CHAR(REQ.req_dt_cadastro, 'MON') AS meses, COUNT(*) AS exames 
		FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_examemetodoversao EMV 
		WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade 
		AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro > TO_DATE(:data_inicial,'dd/mm/yyyy') - 180 AND DER.leg_st_codigo != '013' 
		GROUP BY TO_CHAR(REQ.req_dt_cadastro, 'mm'), TO_CHAR(REQ.req_dt_cadastro, 'MON') ORDER BY 1 DESC";
		$queryRES_EXAME = $zbd->prepare($sqlText);
		$queryRES_EXAME->bindValue(':cli_in_codigo', $_SESSION['ztm_id_cliente'], PDO::PARAM_INT);
		$queryRES_EXAME->bindValue(':uni_st_codigo', $_POST['ztmMonitorUnidade'], PDO::PARAM_STR);
		$queryRES_EXAME->bindValue(':uni_st_execucao', $_POST['ztmMonitorUnidadeExec'], PDO::PARAM_STR);
		$queryRES_EXAME->bindValue(':data_inicial', $_POST['ztmMonitorDataRef'], PDO::PARAM_STR);
		$queryRES_EXAME->bindValue(':data_filtro', (1+$_GET['filtro']), PDO::PARAM_STR);
		$queryRES_EXAME->bindValue(':usu_st_codigo', $_SESSION['ztm_usu_codigo_weblaudos'], PDO::PARAM_STR);
		$queryRES_EXAME->execute();

		$arrayDiasExames = array();
		$arrayDias = array("01"=>"JAN|0","02"=>"FEV|0","03"=>"MAR|0","04"=>"ABR|0","05"=>"MAI|0","06"=>"JUN|0","07"=>"JUL|0","08"=>"AGO|0","09"=>"SET|0","10"=>"OUT|0","11"=>"NOV|0","12"=>"DEZ|0");
		while( $resultRES_EXAME = $queryRES_EXAME->fetch() ){
			$arrayDias[$resultRES_EXAME["MES"]] = $resultRES_EXAME["MESES"]."|".$resultRES_EXAME["EXAMES"];
		}
		foreach ($arrayDias as $i => $banco) {
			if( $i == $resultD["DIA_AGORA"] ){
				break;
			}
		}
		for( $i=0; $i <= $linhasFor; $i++ ){
			$saida = prev($arrayDias);
			if( $saida == "" ){
				$saida = end($arrayDias);
			}
			$arrayDiasExames[$i] = $saida;
		}
		foreach (array_reverse($arrayDiasExames) as $banco) {
			$ss = explode("|",$banco);
			$_s1 .= $ss[0]."|";
			$_s2 .= $ss[1]."|";
		}
	}
	$_SESSION['ztmSessionResProcedimentos'] = $_s1."_".$_s2."_".$a.$resultRES__EXAMES."_".$resultRES_DATAS."_".$linhasFor;
	echo $_s1."_".$_s2."_".$a.$resultRES__EXAMES."_".$resultRES_DATAS."_".$linhasFor;
}

if( $_GET['down'] == "ztmDadosResPacientes" ){
	if( $_GET['filtro'] == "7" && $_GET['seq'] == "N" ){
		$sqlText = "SELECT 'em 7 dias', TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, 
		COALESCE(COUNT(DISTINCT REQ.req_st_codigo),0) AS pacientes FROM lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_requisicao REQ, 
		lab_examemetodoversao EMV WHERE DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro > TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro AND DER.leg_st_codigo != '013' 
		UNION ALL 
		SELECT 'Mês TT', TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, 
		COALESCE(SUM(COUNT(DISTINCT REQ.req_st_codigo)),0) AS pacientes FROM lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, 
		lab_requisicao REQ, lab_examemetodoversao EMV WHERE DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND DER.uni_st_codigo = UUN.uni_st_codigo AND REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo 
		AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' 
		AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE('01'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro,'mm/yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= LAST_DAY(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro) AND DER.leg_st_codigo != '013' 
		GROUP BY REQ.req_dt_cadastro";
	}else if( $_GET['filtro'] == "30" ){
		$sqlText = "SELECT 'Mês TT', COALESCE(SUM(COUNT(DISTINCT REQ.req_st_codigo)),0) AS pacientes FROM lab_detalherequisicao DER, lab_usuariounidade UUN, 
		lab_exame EXA, lab_requisicao REQ, lab_examemetodoversao EMV WHERE DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE('01'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'mm/yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= LAST_DAY(TO_DATE(:data_inicial,'dd/mm/yyyy')) AND DER.leg_st_codigo != '013' 
		GROUP BY REQ.req_dt_cadastro 
		UNION ALL 
		SELECT 'Ano TT', COALESCE(SUM(COUNT(DISTINCT REQ.req_st_codigo)),0) AS pacientes FROM lab_detalherequisicao DER, lab_usuariounidade UUN, 
		lab_exame EXA, lab_requisicao REQ, lab_examemetodoversao EMV WHERE DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE('01/01/'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= TO_DATE('31/12/'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'yyyy'),'dd/mm/yyyy') 
		AND DER.leg_st_codigo != '013' 
		GROUP BY REQ.req_dt_cadastro";
	}else if( $_GET['filtro'] == "180" ){
		$linhasFor = 6;
		$sqlText = "";
	}else if( $_GET['filtro'] == "365" ){
		$linhasFor = 12;
		$sqlText = "";
	}else{
		$sqlText = "SELECT 'Hoje TT', TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, 
		COALESCE(COUNT(DISTINCT REQ.req_st_codigo),0) AS pacientes FROM lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_requisicao REQ, 
		lab_examemetodoversao EMV WHERE DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro = TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro AND DER.leg_st_codigo != '013' 
		UNION ALL 
		SELECT 'Mês TT', TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, 
		COALESCE(SUM(COUNT(DISTINCT REQ.req_st_codigo)),0) AS pacientes FROM lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, 
		lab_requisicao REQ, lab_examemetodoversao EMV WHERE DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND DER.uni_st_codigo = UUN.uni_st_codigo AND REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo 
		AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' 
		AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE('01'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro,'mm/yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= LAST_DAY(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro) AND DER.leg_st_codigo != '013' 
		GROUP BY REQ.req_dt_cadastro";
	}
	$queryRES_TOTAL = $zbd->prepare($sqlText);
	$queryRES_TOTAL->bindValue(':cli_in_codigo', $_SESSION['ztm_id_cliente'], PDO::PARAM_INT);
	$queryRES_TOTAL->bindValue(':uni_st_codigo', $_POST['ztmMonitorUnidade'], PDO::PARAM_STR);
	$queryRES_TOTAL->bindValue(':uni_st_execucao', $_POST['ztmMonitorUnidadeExec'], PDO::PARAM_STR);
	$queryRES_TOTAL->bindValue(':data_filtro', $_GET['filtro'], PDO::PARAM_STR);
	$queryRES_TOTAL->bindValue(':data_inicial', $_POST['ztmMonitorDataRef'], PDO::PARAM_STR);
	$queryRES_TOTAL->bindValue(':usu_st_codigo', $_SESSION['ztm_usu_codigo_weblaudos'], PDO::PARAM_STR);
	$queryRES_TOTAL->execute();
	$a = 0;
	$arrayResumoPacientes = array(0,0,0,0);
	while( $resultRES_TOTAL = $queryRES_TOTAL->fetch() ){
		if( $resultRES_TOTAL["PACIENTES"] != "" ){
			$arrayResumoPacientes[$a] = $resultRES_TOTAL["PACIENTES"];
			if( $_GET['filtro'] == "0" && $_POST['ztmMonitorDataRef'] == $resultD["DATA_AGORA"] ){
				$resultRES_DATAS = "Hoje";
			}else{ 
				if( $_GET['filtro'] != "0" && $_GET['seq'] == "N" ){
					$resultRES_DATAS = $_GET['filtro'];
				}else{
					$resultRES_DATAS = "em ".$resultRES_TOTAL["DATAS_FILTRO"];
				}
			}
			$a++;
		}
	}
	$resultRES__PACIENTES .= "_".implode("_",$arrayResumoPacientes);

	if( $_GET['filtro'] == "0" || $_GET['seq'] == "S" ){
		$linhasFor = 12;
		$sqlText = "SELECT REQ.req_dt_cadastro, TO_CHAR(REQ.req_hr_cadastro, 'hh24') AS hora, COALESCE(COUNT(DISTINCT REQ.req_st_codigo),0) AS pacientes 
		FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_examemetodoversao EMV 
		WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade 
		AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro = TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro AND DER.leg_st_codigo != '013' 
		GROUP BY REQ.req_dt_cadastro, TO_CHAR(REQ.req_hr_cadastro, 'hh24') ORDER BY 1 ASC, 2 ASC";
		$queryRES_PACIENTE = $zbd->prepare($sqlText);
		$queryRES_PACIENTE->bindValue(':cli_in_codigo', $_SESSION['ztm_id_cliente'], PDO::PARAM_INT);
		$queryRES_PACIENTE->bindValue(':uni_st_codigo', $_POST['ztmMonitorUnidade'], PDO::PARAM_STR);
		$queryRES_PACIENTE->bindValue(':uni_st_execucao', $_POST['ztmMonitorUnidadeExec'], PDO::PARAM_STR);
		$queryRES_PACIENTE->bindValue(':data_filtro', $_GET['filtro'], PDO::PARAM_STR);
		$queryRES_PACIENTE->bindValue(':data_inicial', $_POST['ztmMonitorDataRef'], PDO::PARAM_STR);
		$queryRES_PACIENTE->bindValue(':usu_st_codigo', $_SESSION['ztm_usu_codigo_weblaudos'], PDO::PARAM_STR);
		$queryRES_PACIENTE->execute();

		$arrayHorasPacientes = array();
		$arrayHoras = array("00"=>"00|0","01"=>"01|0","02"=>"02|0","03"=>"03|0","04"=>"04|0","05"=>"05|0","06"=>"06|0","07"=>"07|0","08"=>"08|0","09"=>"09|0","10"=>"10|0","11"=>"11|0","12"=>"12|0","13"=>"13|0","14"=>"14|0","15"=>"15|0","16"=>"16|0","17"=>"17|0","18"=>"18|0","19"=>"19|0","20"=>"20|0","21"=>"21|0","22"=>"22|0","23"=>"23|0");
		while( $resultRES_PACIENTE = $queryRES_PACIENTE->fetch() ){
			$arrayHoras[$resultRES_PACIENTE["HORA"]] = $resultRES_PACIENTE["HORA"]."|".$resultRES_PACIENTE["PACIENTES"];
		}
		foreach ($arrayHoras as $i => $banco) {
			if( $i == $resultD["HORAS_AGORA"] ){
				break;
			}
		}
		for( $i=0; $i < 12; $i++ ){
			$saida = prev($arrayHoras);
			if( $saida == "" ){
				$saida = end($arrayHoras);
			}
			$arrayHorasPacientes[$i] = $saida;
		}
		foreach (array_reverse($arrayHorasPacientes) as $banco) {
			$ss = explode("|",$banco);
			$_s1 .= $ss[0]."h|";
			$_s2 .= $ss[1]."|";
		}
	}else if( $_GET['filtro'] == "7" || $_GET['filtro'] == "30" ){
		$linhasFor = $_GET['filtro'];
		$sqlText = "SELECT REQ.req_dt_cadastro, TO_CHAR(REQ.req_dt_cadastro, 'dd') AS dia, COALESCE(COUNT(DISTINCT REQ.req_st_codigo),0) AS pacientes 
		FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_examemetodoversao EMV 
		WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade 
		AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro > TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro AND DER.leg_st_codigo != '013' 
		GROUP BY REQ.req_dt_cadastro, TO_CHAR(REQ.req_dt_cadastro, 'dd') ORDER BY 1 ASC, 2 ASC";
		$queryRES_PACIENTE = $zbd->prepare($sqlText);
		$queryRES_PACIENTE->bindValue(':cli_in_codigo', $_SESSION['ztm_id_cliente'], PDO::PARAM_INT);
		$queryRES_PACIENTE->bindValue(':uni_st_codigo', $_POST['ztmMonitorUnidade'], PDO::PARAM_STR);
		$queryRES_PACIENTE->bindValue(':uni_st_execucao', $_POST['ztmMonitorUnidadeExec'], PDO::PARAM_STR);
		$queryRES_PACIENTE->bindValue(':data_filtro', (1+$_GET['filtro']), PDO::PARAM_STR);
		$queryRES_PACIENTE->bindValue(':data_inicial', $_POST['ztmMonitorDataRef'], PDO::PARAM_STR);
		$queryRES_PACIENTE->bindValue(':usu_st_codigo', $_SESSION['ztm_usu_codigo_weblaudos'], PDO::PARAM_STR);
		$queryRES_PACIENTE->execute();

		$arrayDiasPacientes = array();
		$arrayDias = array("01"=>"01|0","02"=>"02|0","03"=>"03|0","04"=>"04|0","05"=>"05|0","06"=>"06|0","07"=>"07|0","08"=>"08|0","09"=>"09|0","10"=>"10|0","11"=>"11|0","12"=>"12|0","13"=>"13|0","14"=>"14|0","15"=>"15|0","16"=>"16|0","17"=>"17|0","18"=>"18|0","19"=>"19|0","20"=>"20|0","21"=>"21|0","22"=>"22|0","23"=>"23|0","24"=>"24|0","25"=>"25|0","26"=>"26|0","27"=>"27|0","28"=>"28|0","29"=>"29|0","30"=>"30|0","31"=>"31|0");
		while( $resultRES_PACIENTE = $queryRES_PACIENTE->fetch() ){
			$arrayDias[$resultRES_PACIENTE["DIA"]] = $resultRES_PACIENTE["DIA"]."|".$resultRES_PACIENTE["PACIENTES"];
		}
		foreach ($arrayDias as $i => $banco) {
			if( $i == $resultD["DIA_AGORA"] ){
				break;
			}
		}
		for( $i=0; $i < $_GET['filtro']; $i++ ){
			$saida = prev($arrayDias);
			if( $saida == "" ){
				$saida = end($arrayDias);
			}
			$arrayDiasPacientes[$i] = $saida;
		}
		foreach (array_reverse($arrayDiasPacientes) as $banco) {
			$ss = explode("|",$banco);
			$_s1 .= $ss[0]."d|";
			$_s2 .= $ss[1]."|";
		}
	}
	$_SESSION['ztmSessionDadosResPacientes'] = $_s1."_".$_s2."_".$a.$resultRES__PACIENTES."_".$resultRES_DATAS."_".$linhasFor;
	echo $_s1."_".$_s2."_".$a.$resultRES__PACIENTES."_".$resultRES_DATAS."_".$linhasFor;
}

if( $_GET['down'] == "ztmDadosResFaturas" ){
	if( $_GET['filtro'] == "7" && $_GET['seq'] == "N" ){
		$sqlText = "SELECT 'em 7 dias', TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, 
		COALESCE(SUM(DER.der_fl_convenio),0) AS faturas FROM lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_requisicao REQ, 
		lab_examemetodoversao EMV WHERE DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro > TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro AND DER.leg_st_codigo != '013' 
		AND DER.der_ch_fatura = 'S' AND DER.der_ch_trouxemat = 'S' AND DER.der_ch_naonecessario = 'N'
		UNION ALL 
		SELECT 'Mês TT', TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, 
		COALESCE(SUM(DER.der_fl_convenio),0) AS faturas FROM lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_requisicao REQ, 
		lab_examemetodoversao EMV WHERE DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND DER.uni_st_codigo = UUN.uni_st_codigo AND REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo 
		AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade 
		AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE('01'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro,'mm/yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= LAST_DAY(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro) AND DER.leg_st_codigo != '013' 
		AND DER.der_ch_fatura = 'S' AND DER.der_ch_trouxemat = 'S' AND DER.der_ch_naonecessario = 'N'";
	}else if( $_GET['filtro'] == "30" ){
		$sqlText = "SELECT 'Mês TT', SUM(DER.der_fl_convenio) AS faturas FROM lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, 
		lab_requisicao REQ, lab_examemetodoversao EMV WHERE DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE('01'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'mm/yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= LAST_DAY(TO_DATE(:data_inicial,'dd/mm/yyyy')) AND DER.leg_st_codigo != '013' 
		AND DER.der_ch_fatura = 'S' AND DER.der_ch_trouxemat = 'S' AND DER.der_ch_naonecessario = 'N'
		UNION ALL 
		SELECT 'Ano TT', SUM(DER.der_fl_convenio) AS faturas FROM lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_requisicao REQ, 
		lab_examemetodoversao EMV WHERE DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE('01/01/'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= TO_DATE('31/12/'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'yyyy'),'dd/mm/yyyy') 
		AND DER.leg_st_codigo != '013' AND DER.der_ch_fatura = 'S' AND DER.der_ch_trouxemat = 'S' AND DER.der_ch_naonecessario = 'N'";
	}else if( $_GET['filtro'] == "180" ){
		$linhasFor = 6;
		$sqlText = "";
	}else if( $_GET['filtro'] == "365" ){
		$linhasFor = 12;
		$sqlText = "";
	}else{
		$sqlText = "SELECT 'Hoje TT', TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, 
		COALESCE(SUM(DER.der_fl_convenio),0) AS faturas FROM lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_requisicao REQ, 
		lab_examemetodoversao EMV WHERE DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro = TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro AND DER.leg_st_codigo != '013' 
		AND DER.der_ch_fatura = 'S' AND DER.der_ch_trouxemat = 'S' AND DER.der_ch_naonecessario = 'N'
		UNION ALL 
		SELECT 'Mês TT', TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, 
		COALESCE(SUM(DER.der_fl_convenio),0) AS faturas FROM lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_requisicao REQ, 
		lab_examemetodoversao EMV WHERE DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND DER.uni_st_codigo = UUN.uni_st_codigo AND REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo 
		AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade 
		AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE('01'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro,'mm/yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= LAST_DAY(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro) AND DER.leg_st_codigo != '013' 
		AND DER.der_ch_fatura = 'S' AND DER.der_ch_trouxemat = 'S' AND DER.der_ch_naonecessario = 'N'";
	}
	$queryRES_TOTAL = $zbd->prepare($sqlText);
	$queryRES_TOTAL->bindValue(':cli_in_codigo', $_SESSION['ztm_id_cliente'], PDO::PARAM_INT);
	$queryRES_TOTAL->bindValue(':uni_st_codigo', $_POST['ztmMonitorUnidade'], PDO::PARAM_STR);
	$queryRES_TOTAL->bindValue(':uni_st_execucao', $_POST['ztmMonitorUnidadeExec'], PDO::PARAM_STR);
	$queryRES_TOTAL->bindValue(':data_filtro', $_GET['filtro'], PDO::PARAM_STR);
	$queryRES_TOTAL->bindValue(':data_inicial', $_POST['ztmMonitorDataRef'], PDO::PARAM_STR);
	$queryRES_TOTAL->bindValue(':usu_st_codigo', $_SESSION['ztm_usu_codigo_weblaudos'], PDO::PARAM_STR);
	$queryRES_TOTAL->execute();
	$a = 0;
	$arrayResumoFaturas = array(0,0,0,0);
	while( $resultRES_TOTAL = $queryRES_TOTAL->fetch() ){
		if( $resultRES_TOTAL["FATURAS"] != "" ){
			$arrayResumoFaturas[$a] = "R$&nbsp;".number_format($resultRES_TOTAL["FATURAS"],2,',','.');;
			if( $_GET['filtro'] == "0" && $_POST['ztmMonitorDataRef'] == $resultD["DATA_AGORA"] ){
				$resultRES_DATAS = "Hoje";
			}else{ 
				if( $_GET['filtro'] != "0" && $_GET['seq'] == "N" ){
					$resultRES_DATAS = $_GET['filtro'];
				}else{
					$resultRES_DATAS = "em ".$resultRES_TOTAL["DATAS_FILTRO"];
				}
			}
			$a++;
		}
	}
	$resultRES__FATURAS .= "_".implode("_",$arrayResumoFaturas);

	if( $_GET['filtro'] == "0" || $_GET['seq'] == "S" ){
		$linhasFor = 12;
		$sqlText = "SELECT REQ.req_dt_cadastro, TO_CHAR(REQ.req_hr_cadastro, 'hh24') AS hora, SUM(DER.der_fl_convenio) AS faturas 
		FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_examemetodoversao EMV 
		WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade 
		AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro = TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro AND DER.leg_st_codigo != '013' 
		AND DER.der_ch_fatura = 'S' AND DER.der_ch_trouxemat = 'S' AND DER.der_ch_naonecessario = 'N' 
		GROUP BY REQ.req_dt_cadastro, TO_CHAR(REQ.req_hr_cadastro, 'hh24') ORDER BY 1 ASC, 2 ASC";
		$queryRES_FATURAS = $zbd->prepare($sqlText);
		$queryRES_FATURAS->bindValue(':cli_in_codigo', $_SESSION['ztm_id_cliente'], PDO::PARAM_INT);
		$queryRES_FATURAS->bindValue(':uni_st_codigo', $_POST['ztmMonitorUnidade'], PDO::PARAM_STR);
		$queryRES_FATURAS->bindValue(':uni_st_execucao', $_POST['ztmMonitorUnidadeExec'], PDO::PARAM_STR);
		$queryRES_FATURAS->bindValue(':data_filtro', $_GET['filtro'], PDO::PARAM_STR);
		$queryRES_FATURAS->bindValue(':data_inicial', $_POST['ztmMonitorDataRef'], PDO::PARAM_STR);
		$queryRES_FATURAS->bindValue(':usu_st_codigo', $_SESSION['ztm_usu_codigo_weblaudos'], PDO::PARAM_STR);
		$queryRES_FATURAS->execute();

		$arrayHorasFaturas = array();
		$arrayHoras = array("00"=>"00|0","01"=>"01|0","02"=>"02|0","03"=>"03|0","04"=>"04|0","05"=>"05|0","06"=>"06|0","07"=>"07|0","08"=>"08|0","09"=>"09|0","10"=>"10|0","11"=>"11|0","12"=>"12|0","13"=>"13|0","14"=>"14|0","15"=>"15|0","16"=>"16|0","17"=>"17|0","18"=>"18|0","19"=>"19|0","20"=>"20|0","21"=>"21|0","22"=>"22|0","23"=>"23|0");
		while( $resultRES_FATURAS = $queryRES_FATURAS->fetch() ){
			$arrayHoras[$resultRES_FATURAS["HORA"]] = $resultRES_FATURAS["HORA"]."|".str_replace(",",".",$resultRES_FATURAS["FATURAS"]);
		}
		foreach ($arrayHoras as $i => $banco) {
			if( $i == $resultD["HORAS_AGORA"] ){
				break;
			}
		}
		for( $i=0; $i < 12; $i++ ){
			$saida = prev($arrayHoras);
			if( $saida == "" ){
				$saida = end($arrayHoras);
			}
			$arrayHorasFaturas[$i] = $saida;
		}
		foreach (array_reverse($arrayHorasFaturas) as $banco) {
			$ss = explode("|",$banco);
			$_s1 .= $ss[0]."h|";
			$_s2 .= $ss[1]."|";
		}
	}else if( $_GET['filtro'] == "7" || $_GET['filtro'] == "30" ){
		$linhasFor = $_GET['filtro'];
		$sqlText = "SELECT REQ.req_dt_cadastro, TO_CHAR(REQ.req_dt_cadastro, 'dd') AS dia, SUM(DER.der_fl_convenio) AS faturas 
		FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_examemetodoversao EMV 
		WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade 
		AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro > TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro AND DER.leg_st_codigo != '013' 
		AND DER.der_ch_fatura = 'S' AND DER.der_ch_trouxemat = 'S' AND DER.der_ch_naonecessario = 'N' GROUP BY REQ.req_dt_cadastro, 
		TO_CHAR(REQ.req_dt_cadastro, 'dd') ORDER BY 1 ASC, 2 ASC";
		$queryRES_FATURAS = $zbd->prepare($sqlText);
		$queryRES_FATURAS->bindValue(':cli_in_codigo', $_SESSION['ztm_id_cliente'], PDO::PARAM_INT);
		$queryRES_FATURAS->bindValue(':uni_st_codigo', $_POST['ztmMonitorUnidade'], PDO::PARAM_STR);
		$queryRES_FATURAS->bindValue(':uni_st_execucao', $_POST['ztmMonitorUnidadeExec'], PDO::PARAM_STR);
		$queryRES_FATURAS->bindValue(':data_filtro', (1+$_GET['filtro']), PDO::PARAM_STR);
		$queryRES_FATURAS->bindValue(':data_inicial', $_POST['ztmMonitorDataRef'], PDO::PARAM_STR);
		$queryRES_FATURAS->bindValue(':usu_st_codigo', $_SESSION['ztm_usu_codigo_weblaudos'], PDO::PARAM_STR);
		$queryRES_FATURAS->execute();

		$arrayDiasFatura = array();
		$arrayDias = array("01"=>"01|0","02"=>"02|0","03"=>"03|0","04"=>"04|0","05"=>"05|0","06"=>"06|0","07"=>"07|0","08"=>"08|0","09"=>"09|0","10"=>"10|0","11"=>"11|0","12"=>"12|0","13"=>"13|0","14"=>"14|0","15"=>"15|0","16"=>"16|0","17"=>"17|0","18"=>"18|0","19"=>"19|0","20"=>"20|0","21"=>"21|0","22"=>"22|0","23"=>"23|0","24"=>"24|0","25"=>"25|0","26"=>"26|0","27"=>"27|0","28"=>"28|0","29"=>"29|0","30"=>"30|0","31"=>"31|0");
		while( $resultRES_FATURAS = $queryRES_FATURAS->fetch() ){
			$arrayDias[$resultRES_FATURAS["DIA"]] = $resultRES_FATURAS["DIA"]."|".str_replace(",",".",$resultRES_FATURAS["FATURAS"]);
		}
		foreach ($arrayDias as $i => $banco) {
			if( $i == $resultD["DIA_AGORA"] ){
				break;
			}
		}
		for( $i=0; $i < $_GET['filtro']; $i++ ){
			$saida = prev($arrayDias);
			if( $saida == "" ){
				$saida = end($arrayDias);
			}
			$arrayDiasFatura[$i] = $saida;
		}
		foreach (array_reverse($arrayDiasFatura) as $banco) {
			$ss = explode("|",$banco);
			$_s1 .= $ss[0]."d|";
			$_s2 .= $ss[1]."|";
		}
	}
	$_SESSION['ztmSessionDadosResFaturas'] = $_s1."_".$_s2."_".$a.$resultRES__FATURAS."_".$resultRES_DATAS."_".$linhasFor;
	echo $_s1."_".$_s2."_".$a.$resultRES__FATURAS."_".$resultRES_DATAS."_".$linhasFor;
}

if( $_GET['down'] == "ztmDadosResDiario" ){
	if( $_GET['filtro'] == "7" && $_GET['seq'] == "N" ){
		$sqlText = "SELECT 'em 7 dias', COALESCE(COUNT(*),0) AS exames FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_usuariounidade UUN, 
		lab_exame EXA, lab_examemetodoversao EMV WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EXA.exa_st_codigo 
		AND DER.uni_st_codigo = UUN.uni_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro > TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro AND DER.leg_st_codigo != '013' 
		UNION ALL 
		SELECT 'Hoje OK', COALESCE(COUNT(*),0) AS exames FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, 
		lab_examemetodoversao EMV WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EXA.exa_st_codigo 
		AND DER.uni_st_codigo = UUN.uni_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro > TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro AND DER.leg_st_codigo IN ('011','016') 
		UNION ALL 
		SELECT 'Pendentes', COALESCE(COUNT(*),0) AS exames FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, 
		lab_examemetodoversao EMV WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EXA.exa_st_codigo 
		AND DER.uni_st_codigo = UUN.uni_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro > TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro 
		AND DER.leg_st_codigo IN ('001', '002', '003', '004', '005', '006', '007')";
	}else if( $_GET['filtro'] == "30" ){
		$sqlText = "SELECT 'Mês TT', SUM(COUNT(*)) AS exames FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, 
		lab_examemetodoversao EMV WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EXA.exa_st_codigo 
		AND DER.uni_st_codigo = UUN.uni_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE('01'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'mm/yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= LAST_DAY(TO_DATE(:data_inicial,'dd/mm/yyyy')) AND DER.leg_st_codigo != '013' 
		GROUP BY REQ.req_dt_cadastro
		UNION ALL 
		SELECT 'Mês OK', SUM(COUNT(*)) AS exames FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, 
		lab_examemetodoversao EMV WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EXA.exa_st_codigo 
		AND DER.uni_st_codigo = UUN.uni_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE('01'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'mm/yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= TO_DATE('31/12/'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'yyyy'),'dd/mm/yyyy') 
		AND DER.leg_st_codigo IN ('011','016') GROUP BY REQ.req_dt_cadastro
		UNION ALL 
		SELECT 'Pendentes', COALESCE(COUNT(*),0) AS exames FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, 
		lab_examemetodoversao EMV WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EXA.exa_st_codigo 
		AND DER.uni_st_codigo = UUN.uni_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE('01'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'mm/yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= TO_DATE('31/12/'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'yyyy'),'dd/mm/yyyy') 
		AND DER.leg_st_codigo IN ('001', '002', '003', '004', '005', '006', '007')";
	}else if( $_GET['filtro'] == "180" ){
		$linhasFor = 6;
		$sqlText = "SELECT 'Mês TT', SUM(COUNT(*)) AS exames FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, 
		lab_examemetodoversao EMV WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EXA.exa_st_codigo 
		AND DER.uni_st_codigo = UUN.uni_st_codigo AND UUN.usu_st_codigo = :usu_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo 
		AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TRUNC((SELECT TO_DATE(:data_inicial,'dd/mm/yyyy') - 180 FROM dual))
		AND REQ.req_dt_cadastro <= TO_DATE(:data_inicial,'dd/mm/yyyy') AND DER.leg_st_codigo != '013' 
		GROUP BY REQ.req_dt_cadastro
		UNION ALL 
		SELECT 'Mês OK', SUM(COUNT(*)) AS exames FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, 
		lab_examemetodoversao EMV WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EXA.exa_st_codigo 
		AND DER.uni_st_codigo = UUN.uni_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TRUNC((SELECT TO_DATE(:data_inicial,'dd/mm/yyyy') - 180 FROM dual))
		AND REQ.req_dt_cadastro <= TO_DATE(:data_inicial,'dd/mm/yyyy') AND DER.leg_st_codigo IN ('011','016') 
		GROUP BY REQ.req_dt_cadastro
		UNION ALL 
		SELECT 'Pendentes', COALESCE(COUNT(*),0) AS exames FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, 
		lab_examemetodoversao EMV WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EXA.exa_st_codigo 
		AND DER.uni_st_codigo = UUN.uni_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TRUNC((SELECT TO_DATE(:data_inicial,'dd/mm/yyyy') - 180 FROM dual))
		AND REQ.req_dt_cadastro <= TO_DATE(:data_inicial,'dd/mm/yyyy') AND DER.leg_st_codigo IN ('001', '002', '003', '004', '005', '006', '007')";
	}else if( $_GET['filtro'] == "365" ){
		$linhasFor = 12;
		$sqlText = "SELECT 'Ano OK', SUM(COUNT(*)) AS exames FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, 
		lab_examemetodoversao EMV WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EXA.exa_st_codigo 
		AND DER.uni_st_codigo = UUN.uni_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE('01/01/'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= TO_DATE('31/12/'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'yyyy'),'dd/mm/yyyy') AND DER.leg_st_codigo != '013' 
		GROUP BY REQ.req_dt_cadastro
		UNION ALL 
		SELECT 'Ano OK', SUM(COUNT(*)) AS exames FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, 
		lab_examemetodoversao EMV WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EXA.exa_st_codigo 
		AND DER.uni_st_codigo = UUN.uni_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE('01/01/'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= TO_DATE('31/12/'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'yyyy'),'dd/mm/yyyy') 
		AND DER.leg_st_codigo IN ('011','016') GROUP BY REQ.req_dt_cadastro 
		UNION ALL 
		SELECT 'Pendentes', COALESCE(COUNT(*),0) AS exames FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, 
		lab_examemetodoversao EMV WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EXA.exa_st_codigo 
		AND DER.uni_st_codigo = UUN.uni_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE('01/01/'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= TO_DATE('31/12/'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'yyyy'),'dd/mm/yyyy') 
		AND DER.leg_st_codigo IN ('001', '002', '003', '004', '005', '006', '007')";
	}else{
		$sqlText = "SELECT 'Hoje TT', TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, COUNT(*) AS exames 
		FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_examemetodoversao EMV 
		WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade 
		AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro = TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro AND DER.leg_st_codigo != '013' 
		GROUP BY REQ.req_dt_cadastro 
		UNION ALL 
		SELECT 'Hoje OK', TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, COUNT(*) AS exames 
		FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_examemetodoversao EMV 
		WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade 
		AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro = TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro AND DER.leg_st_codigo IN ('011','016') 
		GROUP BY REQ.req_dt_cadastro
		UNION ALL 
		SELECT 'Pendentes', TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, COALESCE(COUNT(*),0) AS exames 
		FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_examemetodoversao EMV 
		WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade 
		AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro = TO_DATE(:data_inicial, 'dd/mm/yyyy')-:data_filtro 
		AND DER.leg_st_codigo IN ('001', '002', '003', '004', '005', '006', '007')";
	}
	$queryRES_TOTAL = $zbd->prepare($sqlText);
	$queryRES_TOTAL->bindValue(':cli_in_codigo', $_SESSION['ztm_id_cliente'], PDO::PARAM_INT);
	$queryRES_TOTAL->bindValue(':uni_st_codigo', $_POST['ztmMonitorUnidade'], PDO::PARAM_STR);
	$queryRES_TOTAL->bindValue(':uni_st_execucao', $_POST['ztmMonitorUnidadeExec'], PDO::PARAM_STR);
	$queryRES_TOTAL->bindValue(':data_inicial', $_POST['ztmMonitorDataRef'], PDO::PARAM_STR);
	$queryRES_TOTAL->bindValue(':data_filtro', $_GET['filtro'], PDO::PARAM_STR);
	$queryRES_TOTAL->bindValue(':usu_st_codigo', $_SESSION['ztm_usu_codigo_weblaudos'], PDO::PARAM_STR);
	$queryRES_TOTAL->execute();
	$a = 0;
	$arrayResumoExames = array(0,0,0);
	while( $resultRES_TOTAL = $queryRES_TOTAL->fetch() ){
		if( $resultRES_TOTAL["EXAMES"] != "" ){
			$arrayResumoExames[$a] = $resultRES_TOTAL["EXAMES"];
			if( $_GET['filtro'] == "0" && $_POST['ztmMonitorDataRef'] == $resultD["DATA_AGORA"] ){
				$resultRES_DATAS = "Hoje";
			}else{ 
				if( $_GET['filtro'] != "0" && $_GET['seq'] == "N" ){
					$resultRES_DATAS = $_GET['filtro'];
				}else{
					$resultRES_DATAS = "em ".$resultRES_TOTAL["DATAS_FILTRO"];
				}
			}
			$a++;
		}
	}
	$resultRES__EXAMES .= "_".implode("_",$arrayResumoExames);
	
	if( $_GET['filtro'] == "0" || $_GET['seq'] == "S" ){
		$linhasFor = 12;
		$sqlText = "SELECT REQ.req_dt_cadastro, TO_CHAR(REQ.req_hr_cadastro, 'hh24') AS hora, COUNT(*) AS exames FROM lab_requisicao REQ, 
		lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_examemetodoversao EMV WHERE REQ.req_st_codigo = DER.req_st_codigo 
		AND DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo 
		AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' 
		AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro AND DER.leg_st_codigo != '013' 
		GROUP BY REQ.req_dt_cadastro, TO_CHAR(REQ.req_hr_cadastro, 'hh24') ORDER BY 1 ASC, 2 ASC";
		$queryRES_EXAME = $zbd->prepare($sqlText);
		$queryRES_EXAME->bindValue(':cli_in_codigo', $_SESSION['ztm_id_cliente'], PDO::PARAM_INT);
		$queryRES_EXAME->bindValue(':uni_st_codigo', $_POST['ztmMonitorUnidade'], PDO::PARAM_STR);
		$queryRES_EXAME->bindValue(':uni_st_execucao', $_POST['ztmMonitorUnidadeExec'], PDO::PARAM_STR);
		$queryRES_EXAME->bindValue(':data_inicial', $_POST['ztmMonitorDataRef'], PDO::PARAM_STR);
		$queryRES_EXAME->bindValue(':data_filtro', (1+$_GET['filtro']), PDO::PARAM_STR);
		$queryRES_EXAME->bindValue(':usu_st_codigo', $_SESSION['ztm_usu_codigo_weblaudos'], PDO::PARAM_STR);
		$queryRES_EXAME->execute();

		$arrayHorasExames = array();
		$arrayHoras = array("00"=>"00|0","01"=>"01|0","02"=>"02|0","03"=>"03|0","04"=>"04|0","05"=>"05|0","06"=>"06|0","07"=>"07|0","08"=>"08|0","09"=>"09|0","10"=>"10|0","11"=>"11|0","12"=>"12|0","13"=>"13|0","14"=>"14|0","15"=>"15|0","16"=>"16|0","17"=>"17|0","18"=>"18|0","19"=>"19|0","20"=>"20|0","21"=>"21|0","22"=>"22|0","23"=>"23|0");
		while( $resultRES_EXAME = $queryRES_EXAME->fetch() ){
			$arrayHoras[$resultRES_EXAME["HORA"]] = $resultRES_EXAME["HORA"]."|".$resultRES_EXAME["EXAMES"];
		}
		foreach ($arrayHoras as $i => $banco) {
			if( $i == $resultD["HORAS_AGORA"] ){
				break;
			}
		}
		for( $i=0; $i < 12; $i++ ){
			$saida = prev($arrayHoras);
			if( $saida == "" ){
				$saida = end($arrayHoras);
			}
			$arrayHorasExames[$i] = $saida;
		}
		foreach (array_reverse($arrayHorasExames) as $banco) {
			$ss = explode("|",$banco);
			$_s1 .= $ss[0]."h|";
			$_s2 .= $ss[1]."|";
		}
		
		$sqlTextP = "SELECT REQ.req_dt_cadastro, TO_CHAR(REQ.req_hr_cadastro, 'hh24') AS hora, COUNT(*) AS exames FROM lab_requisicao REQ, 
		lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_examemetodoversao EMV WHERE REQ.req_st_codigo = DER.req_st_codigo 
		AND DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo 
		AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' 
		AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlTextP .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlTextP .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlTextP .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlTextP .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlTextP .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlTextP .= " AND REQ.req_dt_cadastro >= TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro 
		AND DER.leg_st_codigo IN ('001', '002', '003', '004', '005', '006', '007') 
		GROUP BY REQ.req_dt_cadastro, TO_CHAR(REQ.req_hr_cadastro, 'hh24') ORDER BY 1 ASC, 2 ASC";
		$queryPED_EXAME = $zbd->prepare($sqlTextP);
		$queryRES_EXAME->bindValue(':cli_in_codigo', $_SESSION['ztm_id_cliente'], PDO::PARAM_INT);
		$queryPED_EXAME->bindValue(':uni_st_codigo', $_POST['ztmMonitorUnidade'], PDO::PARAM_STR);
		$queryPED_EXAME->bindValue(':uni_st_execucao', $_POST['ztmMonitorUnidadeExec'], PDO::PARAM_STR);
		$queryPED_EXAME->bindValue(':data_inicial', $_POST['ztmMonitorDataRef'], PDO::PARAM_STR);
		$queryPED_EXAME->bindValue(':data_filtro', (1+$_GET['filtro']), PDO::PARAM_STR);
		$queryPED_EXAME->bindValue(':usu_st_codigo', $_SESSION['ztm_usu_codigo_weblaudos'], PDO::PARAM_STR);
		$queryPED_EXAME->execute();

		$arrayHorasPendente = array();
		$arrayHorasP = array("00"=>"00|0","01"=>"01|0","02"=>"02|0","03"=>"03|0","04"=>"04|0","05"=>"05|0","06"=>"06|0","07"=>"07|0","08"=>"08|0","09"=>"09|0","10"=>"10|0","11"=>"11|0","12"=>"12|0","13"=>"13|0","14"=>"14|0","15"=>"15|0","16"=>"16|0","17"=>"17|0","18"=>"18|0","19"=>"19|0","20"=>"20|0","21"=>"21|0","22"=>"22|0","23"=>"23|0");
		while( $resultPED_EXAME = $queryPED_EXAME->fetch() ){
			$arrayHorasP[$resultPED_EXAME["HORA"]] = $resultPED_EXAME["HORA"]."|".$resultPED_EXAME["EXAMES"];
		}
		foreach ($arrayHorasP as $i => $bancoP) {
			if( $i == $resultD["HORAS_AGORA"] ){
				break;
			}
		}
		for( $i=0; $i < 12; $i++ ){
			$saidaP = prev($arrayHorasP);
			if( $saidaP == "" ){
				$saidaP = end($arrayHorasP);
			}
			$arrayHorasPendente[$i] = $saidaP;
		}
		foreach (array_reverse($arrayHorasPendente) as $bancoP) {
			$pp = explode("|",$bancoP);
			$_p1 .= $pp[0]."h|";
			$_p2 .= $pp[1]."|";
		}
	}else if( $_GET['filtro'] == "7" || $_GET['filtro'] == "30" ){
		$linhasFor = $_GET['filtro'];
		$sqlText = "SELECT REQ.req_dt_cadastro, TO_CHAR(REQ.req_dt_cadastro, 'dd') AS dia, COUNT(*) AS exames FROM lab_requisicao REQ, 
		lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_examemetodoversao EMV WHERE REQ.req_st_codigo = DER.req_st_codigo 
		AND DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo 
		AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' 
		AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro > TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro AND DER.leg_st_codigo != '013' 
		GROUP BY REQ.req_dt_cadastro ORDER BY 1 ASC, 2 ASC";
		$queryRES_EXAME = $zbd->prepare($sqlText);
		$queryRES_EXAME->bindValue(':cli_in_codigo', $_SESSION['ztm_id_cliente'], PDO::PARAM_INT);
		$queryRES_EXAME->bindValue(':uni_st_codigo', $_POST['ztmMonitorUnidade'], PDO::PARAM_STR);
		$queryRES_EXAME->bindValue(':uni_st_execucao', $_POST['ztmMonitorUnidadeExec'], PDO::PARAM_STR);
		$queryRES_EXAME->bindValue(':data_inicial', $_POST['ztmMonitorDataRef'], PDO::PARAM_STR);
		$queryRES_EXAME->bindValue(':data_filtro', (1+$_GET['filtro']), PDO::PARAM_STR);
		$queryRES_EXAME->bindValue(':usu_st_codigo', $_SESSION['ztm_usu_codigo_weblaudos'], PDO::PARAM_STR);
		$queryRES_EXAME->execute();

		$arrayDiasExames = array();
		$arrayDias = array("01"=>"01|0","02"=>"02|0","03"=>"03|0","04"=>"04|0","05"=>"05|0","06"=>"06|0","07"=>"07|0","08"=>"08|0","09"=>"09|0","10"=>"10|0","11"=>"11|0","12"=>"12|0","13"=>"13|0","14"=>"14|0","15"=>"15|0","16"=>"16|0","17"=>"17|0","18"=>"18|0","19"=>"19|0","20"=>"20|0","21"=>"21|0","22"=>"22|0","23"=>"23|0","24"=>"24|0","25"=>"25|0","26"=>"26|0","27"=>"27|0","28"=>"28|0","29"=>"29|0","30"=>"30|0","31"=>"31|0");
		while( $resultRES_EXAME = $queryRES_EXAME->fetch() ){
			$arrayDias[$resultRES_EXAME["DIA"]] = $resultRES_EXAME["DIA"]."|".$resultRES_EXAME["EXAMES"];
		}
		foreach ($arrayDias as $i => $banco) {
			if( $i == $resultD["DIA_AGORA"] ){
				break;
			}
		}
		for( $i=0; $i < $_GET['filtro']; $i++ ){
			$saida = prev($arrayDias);
			if( $saida == "" ){
				$saida = end($arrayDias);
			}
			$arrayDiasExames[$i] = $saida;
		}
		foreach (array_reverse($arrayDiasExames) as $banco) {
			$ss = explode("|",$banco);
			$_s1 .= $ss[0]."d|";
			$_s2 .= $ss[1]."|";
		}
		
		$sqlTextP = "SELECT REQ.req_dt_cadastro, TO_CHAR(REQ.req_dt_cadastro, 'dd') AS dia, COUNT(*) AS exames FROM lab_requisicao REQ, 
		lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_examemetodoversao EMV WHERE REQ.req_st_codigo = DER.req_st_codigo 
		AND DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo 
		AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade AND EMV.emv_ch_ativo = 'S' 
		AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlTextP .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlTextP .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlTextP .= " AND UUN.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlTextP .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlTextP .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlTextP .= " AND REQ.req_dt_cadastro > TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro 
		AND DER.leg_st_codigo IN ('001', '002', '003', '004', '005', '006', '007') GROUP BY REQ.req_dt_cadastro ORDER BY 1 ASC, 2 ASC";
		$queryPED_EXAME = $zbd->prepare($sqlTextP);
		$queryRES_EXAME->bindValue(':cli_in_codigo', $_SESSION['ztm_id_cliente'], PDO::PARAM_INT);
		$queryPED_EXAME->bindValue(':uni_st_codigo', $_POST['ztmMonitorUnidade'], PDO::PARAM_STR);
		$queryPED_EXAME->bindValue(':uni_st_execucao', $_POST['ztmMonitorUnidadeExec'], PDO::PARAM_STR);
		$queryPED_EXAME->bindValue(':data_inicial', $_POST['ztmMonitorDataRef'], PDO::PARAM_STR);
		$queryPED_EXAME->bindValue(':data_filtro', (1+$_GET['filtro']), PDO::PARAM_STR);
		$queryPED_EXAME->bindValue(':usu_st_codigo', $_SESSION['ztm_usu_codigo_weblaudos'], PDO::PARAM_STR);
		$queryPED_EXAME->execute();

		$arrayDiasPendente = array();
		$arrayDiasP = array("01"=>"01|0","02"=>"02|0","03"=>"03|0","04"=>"04|0","05"=>"05|0","06"=>"06|0","07"=>"07|0","08"=>"08|0","09"=>"09|0","10"=>"10|0","11"=>"11|0","12"=>"12|0","13"=>"13|0","14"=>"14|0","15"=>"15|0","16"=>"16|0","17"=>"17|0","18"=>"18|0","19"=>"19|0","20"=>"20|0","21"=>"21|0","22"=>"22|0","23"=>"23|0","24"=>"24|0","25"=>"25|0","26"=>"26|0","27"=>"27|0","28"=>"28|0","29"=>"29|0","30"=>"30|0","31"=>"31|0");
		while( $resultPED_EXAME = $queryPED_EXAME->fetch() ){
			$arrayDiasP[$resultPED_EXAME["DIA"]] = $resultPED_EXAME["DIA"]."|".$resultPED_EXAME["EXAMES"];
		}
		foreach ($arrayDiasP as $i => $bancoP) {
			if( $i == $resultD["DIA_AGORA"] ){
				break;
			}
		}
		for( $i=0; $i < $_GET['filtro']; $i++ ){
			$saidaP = prev($arrayDiasP);
			if( $saidaP == "" ){
				$saidaP = end($arrayDiasP);
			}
			$arrayDiasPendente[$i] = $saidaP;
		}
		foreach (array_reverse($arrayDiasPendente) as $bancoP) {
			$pp = explode("|",$bancoP);
			$_p1 .= $pp[0]."d|";
			$_p2 .= $pp[1]."|";
		}
	}else if( $_GET['filtro'] == "180" || $_GET['filtro'] == "365" ){
		$sqlText = "SELECT TO_CHAR(REQ.req_dt_cadastro, 'mm') AS mes, TO_CHAR(REQ.req_dt_cadastro, 'MON') AS meses, COUNT(*) AS exames 
		FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_examemetodoversao EMV 
		WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade 
		AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND DER.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro > TO_DATE(:data_inicial,'dd/mm/yyyy') - 180 AND DER.leg_st_codigo != '013' 
		GROUP BY TO_CHAR(REQ.req_dt_cadastro, 'mm'), TO_CHAR(REQ.req_dt_cadastro, 'MON') ORDER BY 1 DESC";
		$queryRES_EXAME = $zbd->prepare($sqlText);
		$queryRES_EXAME->bindValue(':cli_in_codigo', $_SESSION['ztm_id_cliente'], PDO::PARAM_INT);
		$queryRES_EXAME->bindValue(':uni_st_codigo', $_POST['ztmMonitorUnidade'], PDO::PARAM_STR);
		$queryPED_EXAME->bindValue(':uni_st_execucao', $_POST['ztmMonitorUnidadeExec'], PDO::PARAM_STR);
		$queryRES_EXAME->bindValue(':data_inicial', $_POST['ztmMonitorDataRef'], PDO::PARAM_STR);
		$queryRES_EXAME->bindValue(':data_filtro', (1+$_GET['filtro']), PDO::PARAM_STR);
		$queryRES_EXAME->bindValue(':usu_st_codigo', $_SESSION['ztm_usu_codigo_weblaudos'], PDO::PARAM_STR);
		$queryRES_EXAME->execute();

		$arrayDiasExames = array();
		$arrayDias = array("01"=>"JAN|0","02"=>"FEV|0","03"=>"MAR|0","04"=>"ABR|0","05"=>"MAI|0","06"=>"JUN|0","07"=>"JUL|0","08"=>"AGO|0","09"=>"SET|0","10"=>"OUT|0","11"=>"NOV|0","12"=>"DEZ|0");
		while( $resultRES_EXAME = $queryRES_EXAME->fetch() ){
			$arrayDias[$resultRES_EXAME["MES"]] = $resultRES_EXAME["MESES"]."|".$resultRES_EXAME["EXAMES"];
		}
		foreach ($arrayDias as $i => $banco) {
			if( $i == $resultD["DIA_AGORA"] ){
				break;
			}
		}
		for( $i=0; $i <= $linhasFor; $i++ ){
			$saida = prev($arrayDias);
			if( $saida == "" ){
				$saida = end($arrayDias);
			}
			$arrayDiasExames[$i] = $saida;
		}
		foreach (array_reverse($arrayDiasExames) as $banco) {
			$ss = explode("|",$banco);
			$_s1 .= $ss[0]."|";
			$_s2 .= $ss[1]."|";
		}
		
		$sqlTextP = "SELECT TO_CHAR(REQ.req_dt_cadastro, 'mm') AS mes, TO_CHAR(REQ.req_dt_cadastro, 'MON') AS meses, COUNT(*) AS exames 
		FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_examemetodoversao EMV 
		WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
		AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade 
		AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlTextP .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlTextP .= " AND DER.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlTextP .= " AND DER.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlTextP .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlTextP .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlTextP .= " AND REQ.req_dt_cadastro > TO_DATE(:data_inicial,'dd/mm/yyyy') - 180 
		AND DER.leg_st_codigo IN ('001', '002', '003', '004', '005', '006', '007') 
		GROUP BY TO_CHAR(REQ.req_dt_cadastro, 'mm'), TO_CHAR(REQ.req_dt_cadastro, 'MON') ORDER BY 1 DESC";
		$queryPED_EXAME = $zbd->prepare($sqlTextP);
		$queryRES_EXAME->bindValue(':cli_in_codigo', $_SESSION['ztm_id_cliente'], PDO::PARAM_INT);
		$queryPED_EXAME->bindValue(':uni_st_codigo', $_POST['ztmMonitorUnidade'], PDO::PARAM_STR);
		$queryPED_EXAME->bindValue(':uni_st_execucao', $_POST['ztmMonitorUnidadeExec'], PDO::PARAM_STR);
		$queryPED_EXAME->bindValue(':data_inicial', $_POST['ztmMonitorDataRef'], PDO::PARAM_STR);
		$queryPED_EXAME->bindValue(':data_filtro', (1+$_GET['filtro']), PDO::PARAM_STR);
		$queryPED_EXAME->bindValue(':usu_st_codigo', $_SESSION['ztm_usu_codigo_weblaudos'], PDO::PARAM_STR);
		$queryPED_EXAME->execute();

		$arrayDiasPendente = array();
		$arrayDiasP = array("01"=>"JAN|0","02"=>"FEV|0","03"=>"MAR|0","04"=>"ABR|0","05"=>"MAI|0","06"=>"JUN|0","07"=>"JUL|0","08"=>"AGO|0","09"=>"SET|0","10"=>"OUT|0","11"=>"NOV|0","12"=>"DEZ|0");
		while( $resultPED_EXAME = $queryPED_EXAME->fetch() ){
			$arrayDiasP[$resultPED_EXAME["MES"]] = $resultPED_EXAME["MESES"]."|".$resultPED_EXAME["EXAMES"];
		}
		foreach ($arrayDiasP as $i => $bancoP) {
			if( $i == $resultD["DIA_AGORA"] ){
				break;
			}
		}
		for( $i=0; $i <= $linhasFor; $i++ ){
			$saidaP = prev($arrayDiasP);
			if( $saidaP == "" ){
				$saidaP = end($arrayDiasP);
			}
			$arrayDiasPendente[$i] = $saidaP;
		}
		foreach (array_reverse($arrayDiasPendente) as $bancoP) {
			$pp = explode("|",$bancoP);
			$_p1 .= $pp[0]."|";
			$_p2 .= $pp[1]."|";
		}
	}
	$_SESSION['ztmSessionDadosResDiario'] = $_s1."_".$_s2."_".$a.$resultRES__EXAMES."_".$resultRES_DATAS."_".$linhasFor."_".$_p2;
	echo $_s1."_".$_s2."_".$a.$resultRES__EXAMES."_".$resultRES_DATAS."_".$linhasFor."_".$_p2;
}

if( $_GET['down'] == "ztmDadosResStatusExames" ){
	$sqlText = "SELECT 'Cadastro' AS tipo, TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, REQ.req_dt_cadastro, 
	COUNT(*) AS qtde, '#808080' AS cor FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_exameunidade EXU, lab_examemetodoversao EMV, lab_exame EXA 
	WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
	AND DER.emv_dt_validade = EMV.emv_dt_validade AND EXA.exa_st_codigo = EXU.exa_st_codigo AND EMV.emv_ch_ativo = 'S' AND DER.der_ch_trouxemat = 'S' 
	AND EXA.exa_ch_grupo = 'N' AND DER.der_ch_naonecessario = 'N' AND DER.der_st_unidadeex = EXU.uni_st_codigo AND DER.exa_st_codigo = EXU.exa_st_codigo 
	AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
	if( $_POST['ztmMonitorUrgentes'] != "" ){
		$sqlText .= " AND DER.der_ch_urgente = 'S'";
	}
	if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
		$sqlText .= " AND DER.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
		WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
	}else{
		$sqlText .= " AND DER.uni_st_codigo = :uni_st_codigo";
	}
	if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
		$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
		WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
	}else{
		$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
	}
	$sqlText .= " AND REQ.req_dt_cadastro = TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro 
	AND DER.leg_st_codigo IN ('001','002') GROUP BY REQ.req_dt_cadastro
	UNION ALL
	SELECT 'Executando' AS tipo, TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, REQ.req_dt_cadastro, 
	COUNT(*) AS qtde, '#00BF00' AS cor FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_exameunidade EXU, lab_examemetodoversao EMV, lab_exame EXA
	WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
	AND DER.emv_dt_validade = EMV.emv_dt_validade AND EXA.exa_st_codigo = EXU.exa_st_codigo AND EMV.emv_ch_ativo = 'S' AND DER.der_ch_trouxemat = 'S' 
	AND EXA.exa_ch_grupo = 'N' AND DER.der_ch_naonecessario = 'N' AND DER.der_st_unidadeex = EXU.uni_st_codigo AND DER.exa_st_codigo = EXU.exa_st_codigo 
	AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
	if( $_POST['ztmMonitorUrgentes'] != "" ){
		$sqlText .= " AND DER.der_ch_urgente = 'S'";
	}
	if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
		$sqlText .= " AND DER.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
		WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
	}else{
		$sqlText .= " AND DER.uni_st_codigo = :uni_st_codigo";
	}
	if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
		$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
		WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
	}else{
		$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
	}
	$sqlText .= " AND REQ.req_dt_cadastro = TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro AND 
	DER.leg_st_codigo IN ('003','004','005','006','007','012','043') GROUP BY REQ.req_dt_cadastro
	UNION ALL
	SELECT 'p/ Assinar' AS tipo, TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, REQ.req_dt_cadastro, 
	COUNT(*) AS qtde, '#00BFFF' AS cor FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_exameunidade EXU, lab_examemetodoversao EMV, lab_exame EXA
	WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
	AND DER.emv_dt_validade = EMV.emv_dt_validade AND EXA.exa_st_codigo = EXU.exa_st_codigo AND EMV.emv_ch_ativo = 'S' AND DER.der_ch_trouxemat = 'S' 
	AND EXA.exa_ch_grupo = 'N' AND DER.der_ch_naonecessario = 'N' AND DER.der_st_unidadeex = EXU.uni_st_codigo AND DER.exa_st_codigo = EXU.exa_st_codigo 
	AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
	if( $_POST['ztmMonitorUrgentes'] != "" ){
		$sqlText .= " AND DER.der_ch_urgente = 'S'";
	}
	if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
		$sqlText .= " AND DER.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
		WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
	}else{
		$sqlText .= " AND DER.uni_st_codigo = :uni_st_codigo";
	}
	if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
		$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
		WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
	}else{
		$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
	}
	$sqlText .= " AND REQ.req_dt_cadastro = TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro 
	AND DER.leg_st_codigo IN ('009','010') GROUP BY REQ.req_dt_cadastro
	UNION ALL
	SELECT 'Assinados' AS tipo, TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, REQ.req_dt_cadastro, 
	COUNT(*) AS qtde, '#0040BF' AS cor FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_exameunidade EXU, lab_examemetodoversao EMV, lab_exame EXA
	WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
	AND DER.emv_dt_validade = EMV.emv_dt_validade AND EXA.exa_st_codigo = EXU.exa_st_codigo AND EMV.emv_ch_ativo = 'S' AND DER.der_ch_trouxemat = 'S' 
	AND EXA.exa_ch_grupo = 'N' AND DER.der_ch_naonecessario = 'N' AND DER.der_st_unidadeex = EXU.uni_st_codigo AND DER.exa_st_codigo = EXU.exa_st_codigo 
	AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
	if( $_POST['ztmMonitorUrgentes'] != "" ){
		$sqlText .= " AND DER.der_ch_urgente = 'S'";
	}
	if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
		$sqlText .= " AND DER.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
		WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
	}else{
		$sqlText .= " AND DER.uni_st_codigo = :uni_st_codigo";
	}
	if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
		$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
		WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
	}else{
		$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
	}
	$sqlText .= " AND REQ.req_dt_cadastro = TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro AND DER.leg_st_codigo = '011' GROUP BY REQ.req_dt_cadastro
	UNION ALL
	SELECT 'Impressos' as tipo, TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, REQ.req_dt_cadastro, 
	COUNT(*) AS qtde, '#FFFF08' AS cor FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_exameunidade EXU, lab_examemetodoversao EMV, lab_exame EXA 
	WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
	AND DER.emv_dt_validade = EMV.emv_dt_validade AND EXA.exa_st_codigo = EXU.exa_st_codigo AND EMV.emv_ch_ativo = 'S' AND DER.der_ch_trouxemat = 'S' 
	AND EXA.exa_ch_grupo = 'N' AND DER.der_ch_naonecessario = 'N' AND DER.der_st_unidadeex = EXU.uni_st_codigo AND DER.exa_st_codigo = EXU.exa_st_codigo 
	AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
	if( $_POST['ztmMonitorUrgentes'] != "" ){
		$sqlText .= " AND DER.der_ch_urgente = 'S'";
	}
	if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
		$sqlText .= " AND DER.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
		WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
	}else{
		$sqlText .= " AND DER.uni_st_codigo = :uni_st_codigo";
	}
	if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
		$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
		WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
	}else{
		$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
	}
	$sqlText .= " AND REQ.req_dt_cadastro = TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro AND DER.leg_st_codigo = '016' GROUP BY REQ.req_dt_cadastro
	UNION ALL
	SELECT 'Na Web' as tipo, TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, REQ.req_dt_cadastro, 
	COUNT(*) AS qtde, '#8B7355' AS cor FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_exameunidade EXU, lab_examemetodoversao EMV, lab_exame EXA 
	WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
	AND DER.emv_dt_validade = EMV.emv_dt_validade AND EXA.exa_st_codigo = EXU.exa_st_codigo AND EMV.emv_ch_ativo = 'S' AND DER.der_ch_trouxemat = 'S' 
	AND EXA.exa_ch_grupo = 'N' AND DER.der_ch_naonecessario = 'N' AND DER.der_st_unidadeex = EXU.uni_st_codigo AND DER.exa_st_codigo = EXU.exa_st_codigo 
	AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
	if( $_POST['ztmMonitorUrgentes'] != "" ){
		$sqlText .= " AND DER.der_ch_urgente = 'S'";
	}
	if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
		$sqlText .= " AND DER.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
		WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
	}else{
		$sqlText .= " AND DER.uni_st_codigo = :uni_st_codigo";
	}
	if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
		$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
		WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
	}else{
		$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
	}
	$sqlText .= " AND REQ.req_dt_cadastro = TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro 
	AND (SELECT COUNT(*) FROM lab_historico HIS WHERE HIS.req_st_codigo = REQ.req_st_codigo AND HIS.obs_st_codigo = 'INTERNET') != 0 
	GROUP BY REQ.req_dt_cadastro
	UNION ALL
	SELECT 'Deve' AS tipo, TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, SYSDATE,
	COUNT(*) AS qtde, '#FF0000' AS cor FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_exameunidade EXU, lab_examemetodoversao EMV, lab_exame EXA 
	WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
	AND DER.emv_dt_validade = EMV.emv_dt_validade AND EXA.exa_st_codigo = EXU.exa_st_codigo AND EMV.emv_ch_ativo = 'S' AND EXA.exa_ch_grupo = 'N' 
	AND DER.der_ch_naonecessario = 'N' AND DER.der_ch_trouxemat = 'N' AND DER.der_st_unidadeex = EXU.uni_st_codigo AND DER.exa_st_codigo = EXU.exa_st_codigo 
	AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
	if( $_POST['ztmMonitorUrgentes'] != "" ){
		$sqlText .= " AND DER.der_ch_urgente = 'S'";
	}
	if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
		$sqlText .= " AND DER.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
		WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
	}else{
		$sqlText .= " AND DER.uni_st_codigo = :uni_st_codigo";
	}
	if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
		$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
		WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
	}else{
		$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
	}
	$sqlText .= " AND REQ.req_dt_cadastro = TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro 
	UNION ALL
	SELECT 'NovaColeta' AS tipo, TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, SYSDATE,
	COUNT(*) AS qtde, '#FF0000' AS cor FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_exameunidade EXU, lab_examemetodoversao EMV, lab_exame EXA 
	WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
	AND DER.emv_dt_validade = EMV.emv_dt_validade AND EXA.exa_st_codigo = EXU.exa_st_codigo AND EMV.emv_ch_ativo = 'S' AND EXA.exa_ch_grupo = 'N' 
	AND DER.der_ch_naonecessario = 'N' AND DER.der_st_unidadeex = EXU.uni_st_codigo AND DER.exa_st_codigo = EXU.exa_st_codigo 
	AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
	if( $_POST['ztmMonitorUrgentes'] != "" ){
		$sqlText .= " AND DER.der_ch_urgente = 'S'";
	}
	if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
		$sqlText .= " AND DER.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
		WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
	}else{
		$sqlText .= " AND DER.uni_st_codigo = :uni_st_codigo";
	}
	if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
		$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
		WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
	}else{
		$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
	}
	$sqlText .= " AND REQ.req_dt_cadastro = TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro AND DER.leg_st_codigo = '020'";
	$queryST = $zbd->prepare($sqlText);
	$queryST->bindValue(':cli_in_codigo', $_SESSION['ztm_id_cliente'], PDO::PARAM_INT);
	$queryST->bindValue(':uni_st_codigo', $_POST['ztmMonitorUnidade'], PDO::PARAM_STR);
	$queryST->bindValue(':uni_st_execucao', $_POST['ztmMonitorUnidadeExec'], PDO::PARAM_STR);
	$queryST->bindValue(':data_inicial', $_POST['ztmMonitorDataRef'], PDO::PARAM_STR);
	$queryST->bindValue(':data_filtro', $_GET['filtro'], PDO::PARAM_STR);
	$queryST->bindValue(':usu_st_codigo', $_SESSION['ztm_usu_codigo_weblaudos'], PDO::PARAM_STR);
	$queryST->execute();
	$arrayStatus = array("Cadastro"=>"0","Executando"=>"0","p/ Assinar"=>"0","Assinados"=>"0","Impressos"=>"0","Na Web"=>"0","Deve"=>"0","NovaColeta"=>"0");
	$a=0;
	while( $resultST = $queryST->fetch() ){
		if( $_GET['filtro'] == "0" && $_POST['ztmMonitorDataRef'] == $resultD["DATA_AGORA"] ){
			$resultRES_DATAS = "Hoje";
		}else{ 
			if( $_GET['filtro'] != "0" && $_GET['seq'] == "N" ){
				$resultRES_DATAS = $_GET['filtro'];
			}else{
				$resultRES_DATAS = "Pendencias<br>em ".$resultST["DATAS_FILTRO"];
			}
		}
		$arrayStatus[$resultST["TIPO"]] = $resultST["QTDE"];
		$a++;
	}
	$saida = str_replace(",","|",implode(",",$arrayStatus));
	$pendente = $arrayStatus["Cadastro"] + $arrayStatus["Executando"];
	$_SESSION['ztmSessionDadosResStatusExames'] = $a."||".$saida."||".$resultRES_DATAS."||".$pendente."||".$arrayStatus["Deve"]."||".$arrayStatus["NovaColeta"];
	echo $a."||".$saida."||".$resultRES_DATAS."||".$pendente."||".$arrayStatus["Deve"]."||".$arrayStatus["NovaColeta"];
}

if( $_GET['down'] == "ztmDadosResPendencias" ){
	if( $_GET['filtro'] == "7" && $_GET['seq'] == "N" ){
		$sqlText = "SELECT 'Mais de 3 Horas' AS tipo, COALESCE(SUM(COUNT(*)),0) AS qtde, '#DC3912' AS cor, 'ztmPendenciasTTA' AS legenda 
		FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_exameunidade EXU, lab_examemetodoversao EMV, lab_unidade UNI 
		WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EXU.uni_st_codigo = UNI.uni_st_codigo AND DER.exa_st_codigo = EXU.exa_st_codigo 
		AND DER.der_ch_trouxemat = 'S' AND DER.der_ch_naonecessario = 'N' AND EMV.emv_ch_ativo = 'S' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND EXU.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND EXU.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro 
		AND ((CASE WHEN DER.der_dt_assinatura IS NULL THEN SYSDATE ELSE DER.DER_dt_assinatura END - DER.der_dt_entradamat) * 24) > 3 
		AND EXU.exu_st_prazourgente = '2HS' AND ((UNI.uni_in_tipomonitor = 1 AND DER.leg_st_codigo NOT IN ('013', '002', '020')) 
		OR (UNI.uni_in_tipomonitor IS NULL AND DER.leg_st_codigo NOT IN ('013', '020'))) GROUP BY REQ.req_dt_cadastro
		UNION ALL
		SELECT 'Até 3 Horas' AS tipo, COALESCE(SUM(COUNT(*)),0) AS qtde, '#FF9900' AS cor, 'ztmPendenciasTTB' AS legenda FROM lab_requisicao REQ, 
		lab_detalherequisicao DER, lab_exameunidade EXU, lab_examemetodoversao EMV, lab_unidade UNI WHERE REQ.req_st_codigo = DER.req_st_codigo 
		AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade 
		AND EXU.uni_st_codigo = UNI.uni_st_codigo AND EMV.emv_ch_ativo = 'S' AND DER.exa_st_codigo = EXU.exa_st_codigo AND DER.der_ch_trouxemat = 'S' 
		AND DER.der_ch_naonecessario = 'N' AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND EXU.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND EXU.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro 
		AND ((DER.der_dt_assinatura - DER.der_dt_entradamat) * 24) > 2 AND ((DER.der_dt_assinatura - DER.der_dt_entradamat) * 24) <= 3 
		AND EXU.exu_st_prazourgente = '2HS' AND ((UNI.uni_in_tipomonitor = 1 AND DER.leg_st_codigo NOT IN ('013', '002', '020')) 
		OR (UNI.uni_in_tipomonitor IS NULL AND DER.leg_st_codigo NOT IN ('013', '020'))) GROUP BY REQ.req_dt_cadastro
		UNION ALL 
		SELECT 'Até 2 Horas' AS tipo, COALESCE(SUM(COUNT(*)),0) AS qtde, '#FFFF08' AS cor, 'ztmPendenciasTTC' AS legenda FROM lab_requisicao REQ, 
		lab_detalherequisicao DER, lab_exameunidade EXU, lab_examemetodoversao EMV, lab_unidade UNI WHERE REQ.req_st_codigo = DER.req_st_codigo 
		AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade 
		AND EXU.uni_st_codigo = UNI.uni_st_codigo AND DER.exa_st_codigo = EXU.exa_st_codigo AND DER.der_ch_trouxemat = 'S' AND DER.der_ch_naonecessario = 'N' 
		AND EMV.emv_ch_ativo = 'S' AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND EXU.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND EXU.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro 
		AND ((DER.der_dt_assinatura - DER.der_dt_entradamat) * 24) > 1 AND ((DER.der_dt_assinatura - DER.der_dt_entradamat) * 24) <= 2 
		AND EXU.exu_st_prazourgente = '2HS' AND DER.leg_st_codigo != '001' GROUP BY REQ.req_dt_cadastro
		UNION ALL 
		SELECT 'Até 1 Hora' AS tipo, COALESCE(SUM(COUNT(*)),0) AS qtde, '#109618' AS cor, 'ztmPendenciasTTD' AS legenda FROM lab_requisicao REQ, 
		lab_detalherequisicao DER, lab_exameunidade EXU, lab_examemetodoversao EMV, lab_unidade UNI WHERE REQ.req_st_codigo = DER.req_st_codigo 
		AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade 
		AND EXU.uni_st_codigo = UNI.uni_st_codigo AND DER.exa_st_codigo = EXU.exa_st_codigo AND DER.der_ch_trouxemat = 'S' AND DER.der_ch_naonecessario = 'N' 
		AND EMV.emv_ch_ativo = 'S' AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND EXU.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND EXU.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro 
		AND ((DER.der_dt_assinatura - der.der_dt_entradamat) * 24) < 1 AND ((DER.der_dt_assinatura - der.der_dt_entradamat) * 24) > 0 
		AND EXU.exu_st_prazourgente = '2HS' AND ((UNI.uni_in_tipomonitor = 1 AND DER.leg_st_codigo NOT IN ('013', '002', '020')) 
		OR (UNI.uni_in_tipomonitor IS NULL AND DER.leg_st_codigo NOT IN ('013', '020'))) GROUP BY REQ.req_dt_cadastro 
		UNION ALL 
		SELECT 'NADA' AS tipo, 0 AS qtde, '#000000' AS cor, 'ztmPendenciasTTA' AS legenda FROM DUAL";
	}else if( $_GET['filtro'] == "30" ){
		$sqlText = "SELECT 'Mais de 3 Horas' AS tipo, COALESCE(SUM(COUNT(*)),0) AS qtde, '#DC3912' AS cor, 'ztmPendenciasTTA' AS legenda 
		FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_exameunidade EXU, lab_examemetodoversao EMV, lab_unidade UNI 
		WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EXU.uni_st_codigo = UNI.uni_st_codigo AND DER.exa_st_codigo = EXU.exa_st_codigo 
		
		
		AND DER.der_ch_trouxemat = 'S' AND DER.der_ch_naonecessario = 'N' AND EMV.emv_ch_ativo = 'S' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND EXU.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND EXU.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE('01'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'mm/yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= LAST_DAY(TO_DATE(:data_inicial,'dd/mm/yyyy')) 
		AND ((CASE WHEN DER.der_dt_assinatura IS NULL THEN SYSDATE ELSE DER.DER_dt_assinatura END - DER.der_dt_entradamat) * 24) > 3 
		AND EXU.exu_st_prazourgente = '2HS' AND ((UNI.uni_in_tipomonitor = 1 AND DER.leg_st_codigo NOT IN ('013', '002', '020')) 
		OR (UNI.uni_in_tipomonitor IS NULL AND DER.leg_st_codigo NOT IN ('013', '020'))) GROUP BY REQ.req_dt_cadastro
		UNION ALL
		SELECT 'Até 3 Horas' AS tipo, COALESCE(SUM(COUNT(*)),0) AS qtde, '#FF9900' AS cor, 'ztmPendenciasTTB' AS legenda 
		FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_exameunidade EXU, lab_examemetodoversao EMV, lab_unidade UNI 
		WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EXU.uni_st_codigo = UNI.uni_st_codigo AND DER.der_ch_trouxemat = 'S' 
		AND DER.der_ch_naonecessario = 'N' AND EMV.emv_ch_ativo = 'S' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND EXU.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND EXU.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE('01'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'mm/yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= LAST_DAY(TO_DATE(:data_inicial,'dd/mm/yyyy')) AND ((DER.der_dt_assinatura - DER.der_dt_entradamat) * 24) > 2 
		AND ((DER.der_dt_assinatura - DER.der_dt_entradamat) * 24) <= 3 AND DER.exa_st_codigo = EXU.exa_st_codigo AND EXU.exu_st_prazourgente = '2HS' 
		AND ((UNI.uni_in_tipomonitor = 1 AND DER.leg_st_codigo NOT IN ('013', '002', '020')) OR (UNI.uni_in_tipomonitor IS NULL 
		AND DER.leg_st_codigo NOT IN ('013', '020'))) GROUP BY REQ.req_dt_cadastro
		UNION ALL 
		SELECT 'Até 2 Horas' AS tipo, COALESCE(SUM(COUNT(*)),0) AS qtde, '#FFFF08' AS cor, 'ztmPendenciasTTC' AS legenda 
		FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_exameunidade EXU, lab_examemetodoversao EMV, lab_unidade UNI 
		WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EXU.uni_st_codigo = UNI.uni_st_codigo AND EMV.emv_ch_ativo = 'S' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND EXU.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND EXU.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE('01'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'mm/yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= LAST_DAY(TO_DATE(:data_inicial,'dd/mm/yyyy')) AND ((DER.der_dt_assinatura - DER.der_dt_entradamat) * 24) > 1 
		AND ((DER.der_dt_assinatura - DER.der_dt_entradamat) * 24) <= 2 AND DER.exa_st_codigo = EXU.exa_st_codigo AND EXU.exu_st_prazourgente = '2HS' 
		AND DER.leg_st_codigo != '001' AND DER.der_ch_trouxemat = 'S' AND DER.der_ch_naonecessario = 'N' GROUP BY REQ.req_dt_cadastro
		UNION ALL 
		SELECT 'Até 1 Hora' AS tipo, COALESCE(SUM(COUNT(*)),0) AS qtde, '#109618' AS cor, 'ztmPendenciasTTD' AS legenda 
		FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_exameunidade EXU, lab_examemetodoversao EMV, lab_unidade UNI 
		WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo 
		AND DER.emv_dt_validade = EMV.emv_dt_validade AND EXU.uni_st_codigo = UNI.uni_st_codigo AND EMV.emv_ch_ativo = 'S' 
		AND DER.der_ch_trouxemat = 'S' AND DER.der_ch_naonecessario = 'N' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND EXU.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND EXU.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE('01'||TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy'),'mm/yyyy'),'dd/mm/yyyy') 
		AND REQ.req_dt_cadastro <= LAST_DAY(TO_DATE(:data_inicial,'dd/mm/yyyy')) AND ((DER.der_dt_assinatura - der.der_dt_entradamat) * 24) < 1 
		AND ((DER.der_dt_assinatura - der.der_dt_entradamat) * 24) > 0 AND DER.exa_st_codigo = EXU.exa_st_codigo AND EXU.exu_st_prazourgente = '2HS' 
		AND ((UNI.uni_in_tipomonitor = 1 AND DER.leg_st_codigo NOT IN ('013', '002', '020')) OR (UNI.uni_in_tipomonitor IS NULL 
		AND DER.leg_st_codigo NOT IN ('013', '020'))) GROUP BY REQ.req_dt_cadastro 
		UNION ALL 
		SELECT 'NADA' AS tipo, 0 AS qtde, '#000000' AS cor, 'ztmPendenciasTTA' AS legenda FROM DUAL";
	}else if( $_GET['filtro'] == 0 || $_GET['seq'] == "S" ){
		$sqlText = "SELECT 'Mais de 3 Horas' AS tipo, TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, 
		REQ.req_dt_cadastro, COALESCE(COUNT(*),0) AS qtde, '#DC3912' AS cor, 'ztmPendenciasTTA' AS legenda FROM lab_requisicao REQ, lab_detalherequisicao DER, 
		lab_exameunidade EXU, lab_examemetodoversao EMV, lab_unidade UNI WHERE REQ.req_st_codigo = DER.req_st_codigo 
		AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade 
		AND EXU.uni_st_codigo = UNI.uni_st_codigo AND DER.exa_st_codigo = EXU.exa_st_codigo AND DER.der_ch_trouxemat = 'S' 
		AND DER.der_ch_naonecessario = 'N' AND EMV.emv_ch_ativo = 'S' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND EXU.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND EXU.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro = TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro 
		AND ((CASE WHEN DER.der_dt_assinatura IS NULL THEN SYSDATE ELSE DER.DER_dt_assinatura END - DER.der_dt_entradamat) * 24) > 3 
		AND EXU.exu_st_prazourgente = '2HS' AND ((UNI.uni_in_tipomonitor = 1 AND DER.leg_st_codigo NOT IN ('013', '002', '020')) 
		OR (UNI.uni_in_tipomonitor IS NULL AND DER.leg_st_codigo NOT IN ('013', '020'))) GROUP BY REQ.req_dt_cadastro 
		UNION ALL
		SELECT 'Até 3 Horas' AS tipo, TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, REQ.req_dt_cadastro, 
		COALESCE(COUNT(*),0) AS qtde, '#FF9900' AS cor, 'ztmPendenciasTTB' AS legenda FROM lab_requisicao REQ, lab_detalherequisicao DER, 
		lab_exameunidade EXU, lab_examemetodoversao EMV, lab_unidade UNI WHERE REQ.req_st_codigo = DER.req_st_codigo 
		AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade 
		AND EXU.uni_st_codigo = UNI.uni_st_codigo AND DER.exa_st_codigo = EXU.exa_st_codigo AND DER.der_ch_trouxemat = 'S' 
		AND DER.der_ch_naonecessario = 'N' AND EMV.emv_ch_ativo = 'S' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND EXU.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND EXU.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro = TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro 
		AND ((DER.der_dt_assinatura - DER.der_dt_entradamat) * 24) > 2 AND ((DER.der_dt_assinatura - DER.der_dt_entradamat) * 24) <= 3	
		AND EXU.exu_st_prazourgente = '2HS' AND ((UNI.uni_in_tipomonitor = 1 AND DER.leg_st_codigo NOT IN ('013', '002', '020')) 
		OR (UNI.uni_in_tipomonitor IS NULL AND DER.leg_st_codigo NOT IN ('013', '020'))) GROUP BY REQ.req_dt_cadastro 
		UNION ALL 
		SELECT 'Até 2 Horas' AS tipo, TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, REQ.req_dt_cadastro, 
		COALESCE(COUNT(*),0) AS qtde, '#FFFF08' AS cor, 'ztmPendenciasTTC' AS legenda FROM lab_requisicao REQ, lab_detalherequisicao DER, 
		lab_exameunidade EXU, lab_examemetodoversao  EMV, lab_unidade UNI WHERE REQ.req_st_codigo = DER.req_st_codigo 
		AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade 
		AND EXU.uni_st_codigo = UNI.uni_st_codigo AND DER.exa_st_codigo = EXU.exa_st_codigo AND DER.der_ch_trouxemat = 'S' 
		AND DER.der_ch_naonecessario = 'N' AND EMV.emv_ch_ativo = 'S' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND EXU.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND EXU.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro = TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro 
		AND ((DER.der_dt_assinatura - DER.der_dt_entradamat) * 24) > 1 AND ((DER.der_dt_assinatura - DER.der_dt_entradamat) * 24) <= 2 
		AND EXU.exu_st_prazourgente = '2HS' AND DER.leg_st_codigo != '001' GROUP BY REQ.req_dt_cadastro 
		UNION ALL 
		SELECT 'Até 1 Hora' AS tipo, TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, REQ.req_dt_cadastro, 
		COALESCE(COUNT(*),0) AS qtde, '#109618' AS cor, 'ztmPendenciasTTD' AS legenda FROM lab_requisicao REQ, lab_detalherequisicao DER, 
		lab_exameunidade EXU, lab_examemetodoversao EMV, lab_unidade UNI WHERE REQ.req_st_codigo = DER.req_st_codigo 
		AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade 
		AND EXU.uni_st_codigo = UNI.uni_st_codigo AND DER.exa_st_codigo = EXU.exa_st_codigo AND DER.der_ch_trouxemat = 'S' 
		AND DER.der_ch_naonecessario = 'N' AND EMV.emv_ch_ativo = 'S' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND EXU.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND EXU.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro = TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro 
		AND ((DER.der_dt_assinatura - der.der_dt_entradamat) * 24) < 1 AND ((DER.der_dt_assinatura - der.der_dt_entradamat) * 24) > 0 
		AND EXU.exu_st_prazourgente = '2HS' AND ((UNI.uni_in_tipomonitor = 1 AND DER.leg_st_codigo NOT IN ('013', '002', '020')) 
		OR (UNI.uni_in_tipomonitor IS NULL AND DER.leg_st_codigo NOT IN ('013', '020'))) GROUP BY REQ.req_dt_cadastro 
		UNION ALL 
		SELECT 'NADA' AS tipo, TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, SYSDATE, 0 AS qtde, 
		'#000000' AS cor, 'ztmPendenciasTTA' AS legenda FROM DUAL";
	}else{
		$sqlText = "SELECT 'Mais de 3 Horas' AS tipo, TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, 
		COALESCE(SUM(COUNT(*)),0) AS qtde, '#DC3912' AS cor, 'ztmPendenciasTTA' AS legenda FROM lab_requisicao REQ, lab_detalherequisicao DER, 
		lab_exameunidade EXU, lab_examemetodoversao EMV, lab_unidade UNI WHERE REQ.req_st_codigo = DER.req_st_codigo 
		AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade 
		AND EXU.uni_st_codigo = UNI.uni_st_codigo AND DER.exa_st_codigo = EXU.exa_st_codigo AND DER.der_ch_trouxemat = 'S' 
		AND DER.der_ch_naonecessario = 'N' AND EMV.emv_ch_ativo = 'S' 
		AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND EXU.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND EXU.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro 
		AND ((CASE WHEN DER.der_dt_assinatura IS NULL THEN SYSDATE ELSE DER.DER_dt_assinatura END - DER.der_dt_entradamat) * 24) > 3 
		AND EXU.exu_st_prazourgente = '2HS' AND ((UNI.uni_in_tipomonitor = 1 AND DER.leg_st_codigo NOT IN ('013', '002', '020')) 
		OR (UNI.uni_in_tipomonitor IS NULL AND DER.leg_st_codigo NOT IN ('013', '020'))) GROUP BY REQ.req_dt_cadastro 
		UNION ALL
		SELECT 'Até 3 Horas' AS tipo, TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, 
		COALESCE(SUM(COUNT(*)),0) AS qtde, '#FF9900' AS cor, 'ztmPendenciasTTB' AS legenda FROM lab_requisicao REQ, lab_detalherequisicao DER, 
		lab_exameunidade EXU, lab_examemetodoversao EMV, lab_unidade UNI WHERE REQ.req_st_codigo = DER.req_st_codigo 
		AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade 
		AND EXU.uni_st_codigo = UNI.uni_st_codigo AND DER.exa_st_codigo = EXU.exa_st_codigo AND DER.der_ch_trouxemat = 'S' AND DER.der_ch_naonecessario = 'N' 
		AND EMV.emv_ch_ativo = 'S' AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND EXU.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND EXU.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro 
		AND ((DER.der_dt_assinatura - DER.der_dt_entradamat) * 24) > 2 AND ((DER.der_dt_assinatura - DER.der_dt_entradamat) * 24) <= 3 
		AND EXU.exu_st_prazourgente = '2HS' AND ((UNI.uni_in_tipomonitor = 1 AND DER.leg_st_codigo NOT IN ('013', '002', '020')) 
		OR (UNI.uni_in_tipomonitor IS NULL AND DER.leg_st_codigo NOT IN ('013', '020'))) GROUP BY REQ.req_dt_cadastro 
		UNION ALL 
		SELECT 'Até 2 Horas' AS tipo, TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, 
		COALESCE(SUM(COUNT(*)),0) AS qtde, '#FFFF08' AS cor, 'ztmPendenciasTTC' AS legenda FROM lab_requisicao REQ, lab_detalherequisicao DER, 
		lab_exameunidade EXU, lab_examemetodoversao EMV, lab_unidade UNI WHERE REQ.req_st_codigo = DER.req_st_codigo 
		AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade 
		AND EXU.uni_st_codigo = UNI.uni_st_codigo AND DER.exa_st_codigo = EXU.exa_st_codigo AND DER.der_ch_trouxemat = 'S' AND DER.der_ch_naonecessario = 'N' 
		AND EMV.emv_ch_ativo = 'S' AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND EXU.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND EXU.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro 
		AND((DER.der_dt_assinatura - DER.der_dt_entradamat) * 24) > 1 AND ((DER.der_dt_assinatura - DER.der_dt_entradamat) * 24) <= 2 
		AND EXU.exu_st_prazourgente = '2HS' AND DER.leg_st_codigo != '001' GROUP BY REQ.req_dt_cadastro 
		UNION ALL 
		SELECT 'Até 1 Hora' AS tipo, TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, 
		COALESCE(SUM(COUNT(*)),0) AS qtde, '#109618' AS cor, 'ztmPendenciasTTD' AS legenda FROM lab_requisicao REQ, lab_detalherequisicao DER, 
		lab_exameunidade EXU, lab_examemetodoversao EMV, lab_unidade UNI WHERE REQ.req_st_codigo = DER.req_st_codigo 
		AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade 
		AND EXU.uni_st_codigo = UNI.uni_st_codigo AND DER.exa_st_codigo = EXU.exa_st_codigo AND DER.der_ch_trouxemat = 'S' AND DER.der_ch_naonecessario = 'N' 
		AND EMV.emv_ch_ativo = 'S' AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
		if( $_POST['ztmMonitorUrgentes'] != "" ){
			$sqlText .= " AND DER.der_ch_urgente = 'S'";
		}
		if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
			$sqlText .= " AND EXU.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND EXU.uni_st_codigo = :uni_st_codigo";
		}
		if( $_POST['ztmMonitorUnidadeExec'] == "TODAS" ){
			$sqlText .= " AND DER.der_st_unidadeex IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
			WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
		}else{
			$sqlText .= " AND DER.der_st_unidadeex = :uni_st_execucao";
		}
		$sqlText .= " AND REQ.req_dt_cadastro >= TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro 
		AND ((DER.der_dt_assinatura - der.der_dt_entradamat) * 24) < 1 AND ((DER.der_dt_assinatura - der.der_dt_entradamat) * 24) > 0 
		AND EXU.exu_st_prazourgente = '2HS' AND ((UNI.uni_in_tipomonitor = 1 AND DER.leg_st_codigo NOT IN ('013', '002', '020')) 
		OR (UNI.uni_in_tipomonitor IS NULL AND DER.leg_st_codigo NOT IN ('013', '020'))) GROUP BY REQ.req_dt_cadastro 
		UNION ALL 
		SELECT 'NADA' AS tipo, TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, SYSDATE, 0 AS qtde, 
		'#000000' AS cor, 'ztmPendenciasTTA' AS legenda FROM DUAL";
	}
	$queryPP = $zbd->prepare($sqlText);
	$queryPP->bindValue(':cli_in_codigo', $_SESSION['ztm_id_cliente'], PDO::PARAM_INT);
	$queryPP->bindValue(':uni_st_codigo', $_POST['ztmMonitorUnidade'], PDO::PARAM_STR);
	$queryPP->bindValue(':uni_st_execucao', $_POST['ztmMonitorUnidadeExec'], PDO::PARAM_STR);
	$queryPP->bindValue(':data_inicial', $_POST['ztmMonitorDataRef'], PDO::PARAM_STR);
	$queryPP->bindValue(':data_filtro', $_GET['filtro'], PDO::PARAM_STR);
	$queryPP->bindValue(':usu_st_codigo', $_SESSION['ztm_usu_codigo_weblaudos'], PDO::PARAM_STR);
	$queryPP->execute();
	$a = 0;
	while( $resultPP = $queryPP->fetch() ){
		if( $_GET['filtro'] == "0" && $_POST['ztmMonitorDataRef'] == $resultD["DATA_AGORA"] ){
			$resultRES_DATAS = "Hoje";
		}else{ 
			if( $_GET['filtro'] != "0" && $_GET['seq'] == "N" ){
				$resultRES_DATAS = $_GET['filtro'];
			}else{
				$resultRES_DATAS = "em ".$resultPP["DATAS_FILTRO"];
			}
		}
		$saidaA .= $resultPP["QTDE"]."|".$resultPP["COR"]."|".$resultPP["TIPO"]."|".$resultPP["LEGENDA"]."_";
		$saidaB .= $resultPP["QTDE"]."|".$resultPP["COR"]."|".utf8_decode($resultPP["TIPO"])."|".$resultPP["LEGENDA"]."_";
		$a++;
	}
	$_SESSION['ztmSessionDadosResPendencias'] = $a."||".$saidaA."||".$resultRES_DATAS;
	echo $a."||".$saidaB."||".$resultRES_DATAS;
}


if( $_GET['down'] == "ztmDadosResStatusLibera" ){
	$sqlText = "SELECT 'ATRASADO' AS tipo, ST.set_st_codigo, TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, 
	(SELECT COUNT(*) FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_examemetodoversao EMV 
	WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
	AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade 
	AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND EXA.exa_ch_grupo = 'N' 
	AND DER.der_dt_dataprevistaentrega >= TRUNC(TO_DATE(:data_inicial,'dd/mm/yyyy') - NVL((SELECT SER.set_in_diaspendencia FROM lab_setor SER 
	WHERE SER.uni_st_codigo = DER.uni_st_codigo AND SER.set_st_codigo = DER.set_st_codigo), (SELECT PRM.prm_in_diaspendencia FROM lab_parametros PRM))) 
	AND DER.der_dt_dataprevistaentrega < TRUNC(TO_DATE(:data_inicial,'dd/mm/yyyy')) 
	AND DER.leg_st_codigo IN ('001', '002', '003', '004','005','006','007','012','043') AND DER.der_ch_trouxemat = 'S' AND DER.der_ch_naonecessario = 'N' 
	AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
	if( $_POST['ztmMonitorUrgentes'] != "" ){
		$sqlText .= " AND DER.der_ch_urgente = 'S'";
	}
	if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
		$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
		WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
	}else{
		$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
	}
	$sqlText .= " AND DER.apo_st_codigo IS NULL AND (DER.exa_st_codigo != DER.grp_st_codigo OR DER.grp_st_codigo IS NULL) 
	AND DER.der_st_unidadeex = ST.uni_st_codigo AND DER.set_st_codigo = ST.set_st_codigo) AS qtde FROM lab_setor ST 
	WHERE ST.uni_st_codigo = :uni_st_execucao 
	UNION ALL 
	SELECT 'HOJE' AS tipo, ST.set_st_codigo, TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, 
	(SELECT COUNT(*) FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_examemetodoversao EMV 
	WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
	AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade 
	AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND EXA.exa_ch_grupo = 'N' 
	AND DER.der_dt_dataprevistaentrega >= TRUNC(TO_DATE(:data_inicial,'dd/mm/yyyy')) 
	AND DER.der_dt_dataprevistaentrega < TRUNC(TO_DATE(:data_inicial,'dd/mm/yyyy')+1) 
	AND DER.leg_st_codigo IN ('001', '002', '003', '004','005','006','007','012','043') AND DER.der_ch_trouxemat = 'S' AND DER.der_ch_naonecessario = 'N' 
	AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
	if( $_POST['ztmMonitorUrgentes'] != "" ){
		$sqlText .= " AND DER.der_ch_urgente = 'S'";
	}
	if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
		$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
		WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
	}else{
		$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
	}
	$sqlText .= " AND DER.apo_st_codigo IS NULL AND (DER.exa_st_codigo != DER.grp_st_codigo OR DER.grp_st_codigo IS NULL) 
	AND DER.der_st_unidadeex = ST.uni_st_codigo AND DER.set_st_codigo = ST.set_st_codigo) AS qtde FROM lab_setor ST 
	WHERE ST.uni_st_codigo = :uni_st_execucao 
	UNION ALL 
	SELECT 'ENTREGA FUTURA' AS tipo, ST.set_st_codigo, TO_CHAR(TO_DATE(:data_inicial,'dd/mm/yyyy')-:data_filtro, 'dd/mm/yyyy') AS datas_filtro, 
	(SELECT COUNT(*) FROM lab_requisicao REQ, lab_detalherequisicao DER, lab_usuariounidade UUN, lab_exame EXA, lab_examemetodoversao EMV 
	WHERE REQ.req_st_codigo = DER.req_st_codigo AND DER.exa_st_codigo = EXA.exa_st_codigo AND DER.uni_st_codigo = UUN.uni_st_codigo 
	AND DER.exa_st_codigo = EMV.exa_st_codigo AND DER.met_st_codigo = EMV.met_st_codigo AND DER.emv_dt_validade = EMV.emv_dt_validade 
	AND EMV.emv_ch_ativo = 'S' AND UUN.usu_st_codigo = :usu_st_codigo AND EXA.exa_ch_grupo = 'N' 
	AND DER.der_dt_dataprevistaentrega >= TRUNC(TO_DATE(:data_inicial, 'dd/mm/yyyy') + 1) 
	AND DER.leg_st_codigo IN ('001', '002', '003', '004','005','006','007','012','043') AND DER.der_ch_trouxemat = 'S' AND DER.der_ch_naonecessario = 'N' 
	AND REQ.uni_st_codigo IN (SELECT uni_st_codigo FROM lisnet.lis_clienteunidade WHERE cli_in_codigo = :cli_in_codigo)";
	if( $_POST['ztmMonitorUrgentes'] != "" ){
		$sqlText .= " AND DER.der_ch_urgente = 'S'";
	}
	if( $_POST['ztmMonitorUnidade'] == "TODAS" ){
		$sqlText .= " AND UUN.uni_st_codigo IN (SELECT UNI.uni_st_codigo FROM lab_usuariounidade USA, lab_unidade UNI 
		WHERE USA.uni_st_codigo = UNI.uni_st_codigo AND USA.usu_st_codigo = :usu_st_codigo AND UNI.uni_ch_ativo = 'S')";
	}else{
		$sqlText .= " AND UUN.uni_st_codigo = :uni_st_codigo";
	}
	$sqlText .= " AND DER.apo_st_codigo IS NULL AND (DER.exa_st_codigo != DER.grp_st_codigo OR DER.grp_st_codigo IS NULL) 
	AND DER.der_st_unidadeex = ST.uni_st_codigo AND DER.set_st_codigo = ST.set_st_codigo) AS qtde FROM lab_setor ST 
	WHERE ST.uni_st_codigo = :uni_st_execucao ORDER BY set_st_codigo, tipo";
	
	$queryRES_STATUSLIBERA = $zbd->prepare($sqlText);
	$queryRES_STATUSLIBERA->bindValue(':cli_in_codigo', $_SESSION['ztm_id_cliente'], PDO::PARAM_INT);
	$queryRES_STATUSLIBERA->bindValue(':uni_st_codigo', $_POST['ztmMonitorUnidade'], PDO::PARAM_STR);
	$queryRES_STATUSLIBERA->bindValue(':uni_st_execucao', $_POST['ztmMonitorUnidadeExec'], PDO::PARAM_STR);
	$queryRES_STATUSLIBERA->bindValue(':data_filtro', $_GET['filtro'], PDO::PARAM_STR);
	$queryRES_STATUSLIBERA->bindValue(':data_inicial', $_POST['ztmMonitorDataRef'], PDO::PARAM_STR);
	$queryRES_STATUSLIBERA->bindValue(':usu_st_codigo', $_SESSION['ztm_usu_codigo_weblaudos'], PDO::PARAM_STR);
	$queryRES_STATUSLIBERA->execute();
	//print_r($zbd->errorInfo());
	
	$arrayStatusLibera = array();
	$a=0;
	while( $resultRES_STATUSLIBERA = $queryRES_STATUSLIBERA->fetch() ){
		$arrayStatusLibera[$resultRES_STATUSLIBERA["SET_ST_CODIGO"]] = $arrayStatusLibera[$resultRES_STATUSLIBERA["SET_ST_CODIGO"]]."_".$resultRES_STATUSLIBERA["QTDE"];
		$setTotal += $resultRES_STATUSLIBERA["QTDE"];
		$a++;
	}
	foreach($arrayStatusLibera as $indice => $valor){
		$saida .= $indice.$valor."|";
	}
	if( $setTotal == 0 ){
		$a = 0;
	}
	$_SESSION['ztmSessionDadosResStatusLibera'] = $a."||".$saida."|".$resultRES_DATAS;
	echo $a."||".$saida."|".$resultRES_DATAS;
}

if( $_GET['down'] == "ztmMonitoramentoDash" ){
	$_telaMonitor .= '<div class="row">';
		$_telaMonitor .= '<div class="estrutura_col3">';
			$_telaMonitor .= '<div class="estrutura_row">';
				$_telaMonitor .= '<div class="estrutura_col">';
					$_telaMonitor .= '<span class="grafico-tits">Resumo Procedimentos&nbsp;</span>';
				$_telaMonitor .= '</div>';
				$_telaMonitor .= '<div class="estrutura_col">';
					$_telaMonitor .= '<div class="grafico-tits-linha"></div>';
				$_telaMonitor .= '</div>';
			$_telaMonitor .= '</div>';
			$_telaMonitor .= '<div class="estrutura_row">';
				$_telaMonitor .= '<div class="grafico-tits-lateral" style="border-left:1px #BBBBBB solid;">';
					$_telaMonitor .= '<span id="ztmExamesSubA1" class="font-sub-tit"><i>Hoje</i></span>';
					$_telaMonitor .= '<br><span id="ztmExamesHojeTT" class="font-g">0</span>&nbsp;<span class="font-pp">Total</span>';
					$_telaMonitor .= '<br>&nbsp;';
				$_telaMonitor .= '</div>';
			$_telaMonitor .= '</div>';
			$_telaMonitor .= '<div class="estrutura_row">';
				$_telaMonitor .= '<div id="ztmDadosResProcedimentosDiv" class="estrutura_col div-grafico-canvas" style="padding-top:10px;"></div>';
			$_telaMonitor .= '</div>';
		$_telaMonitor .= '</div>';
		$_telaMonitor .= '<div class="estrutura_col3">';
			$_telaMonitor .= '<div class="estrutura_row">';
				$_telaMonitor .= '<div class="estrutura_col">';
					$_telaMonitor .= '<span class="grafico-tits">Resumo Pacientes&nbsp;</span>';
				$_telaMonitor .= '</div>';
				$_telaMonitor .= '<div class="estrutura_col">';
					$_telaMonitor .= '<div class="grafico-tits-linha"></div>';
				$_telaMonitor .= '</div>';
			$_telaMonitor .= '</div>';
			$_telaMonitor .= '<div class="estrutura_row">';
				$_telaMonitor .= '<div class="grafico-tits-lateral" style="border-left:1px #BBBBBB solid;">';
					$_telaMonitor .= '<span id="ztmPacientesSubA1" class="font-sub-tit"><i>Hoje</i></span>';
					$_telaMonitor .= '<br><span id="ztmPacientesHojeTT" class="font-g">0</span>&nbsp;<span class="font-pp">Total</span>';
					$_telaMonitor .= '<br>&nbsp;';
				$_telaMonitor .= '</div>';
			$_telaMonitor .= '</div>';
			$_telaMonitor .= '<div class="estrutura_row">';
				$_telaMonitor .= '<div id="ztmDadosResPacientesDiv" class="estrutura_col div-grafico-canvas" style="padding-top:10px;"></div>';
			$_telaMonitor .= '</div>';
		$_telaMonitor .= '</div>';
		$_telaMonitor .= '<div class="estrutura_col3">';
			$_telaMonitor .= '<div class="estrutura_row">';
				$_telaMonitor .= '<div class="estrutura_col">';
					$_telaMonitor .= '<span class="grafico-tits">Faturamento Estimado&nbsp;</span>';
				$_telaMonitor .= '</div>';
				$_telaMonitor .= '<div class="estrutura_col">';
					$_telaMonitor .= '<div class="grafico-tits-linha"></div>';
				$_telaMonitor .= '</div>';
			$_telaMonitor .= '</div>';
			$_telaMonitor .= '<div class="estrutura_row">';
				$_telaMonitor .= '<div class="grafico-tits-lateral" style="border-left:1px #BBBBBB solid;">';
					$_telaMonitor .= '<span id="ztmFaturasSubA1" class="font-sub-tit"><i>Hoje</i></span>';
					$_telaMonitor .= '<br><span id="ztmFaturasHojeTT" class="font-g">0</span>&nbsp;<span class="font-pp">Total</span>';
					$_telaMonitor .= '<br>&nbsp;';
				$_telaMonitor .= '</div>';
			$_telaMonitor .= '</div>';
			$_telaMonitor .= '<div class="estrutura_row">';
				$_telaMonitor .= '<div id="ztmDadosResFaturasDiv" class="estrutura_col div-grafico-canvas" style="padding-top:10px;"></div>';
			$_telaMonitor .= '</div>';
		$_telaMonitor .= '</div>';
	$_telaMonitor .= '</div>';
	$_telaMonitor .= '<div class="row">';
		$_telaMonitor .= '<div class="estrutura_col3" style="text-align:center;">';
			$_telaMonitor .= '<div class="btn-group btn-group-sm" data-toggle="buttons">';
				$_telaMonitor .= '<input type="hidden" id="Apaginas" name="Apaginas" value="0">';
				$_telaMonitor .= '<label id="btnAmais" class="btn btn-default-lis btn-sm btn-checkboxs" onClick="zFiltraMonitorSequencia(false,\'ztmDadosResProcedimentos\',\'Apaginas\',\'+1\');"><span class="glyphicon glyphicon-backward"></label>';
				$_telaMonitor .= '<label class="btn btn-default-lis btn-sm grafico-bots active" onClick="zFiltraMonitoramento(false,\'ztmDadosResProcedimentos\',\'Apaginas\',\'N\',\'0\');"><input id="A1d" name="nomeA" type="radio" value="0"><b>Hoje</b></label>';
				$_telaMonitor .= '<label class="btn btn-default-lis btn-sm grafico-bots" onClick="zFiltraMonitoramento(false,\'ztmDadosResProcedimentos\',\'Apaginas\',\'N\',\'7\');"><input id="A7d" name="nomeA" type="radio" value="7"><b>7 dias</b></label>';
				$_telaMonitor .= '<label class="btn btn-default-lis btn-sm grafico-bots" onClick="zFiltraMonitoramento(false,\'ztmDadosResProcedimentos\',\'Apaginas\',\'N\',\'30\');"><input id="A1m" name="nomeA" type="radio" value="30"><b>1 mês</b></label>';
				//$_telaMonitor .= '<label class="btn btn-default-lis btn-sm" onClick="zFiltraMonitoramento(false,\'ztmDadosResProcedimentos\',\'Apaginas\',\'N\',\'180\');"><input id="A6m" name="nomeA" type="radio" value="180"><b>6 meses</b></label>';
				//$_telaMonitor .= '<label class="btn btn-default-lis btn-sm" onClick="zFiltraMonitoramento(false,\'ztmDadosResProcedimentos\',\'Apaginas\',\'N\',\'365\');"><input id="A1a" name="nomeA" type="radio" value="360"><b>1 ano</b></label>';
				$_telaMonitor .= '<label id="btnAmenos" class="btn btn-default-lis btn-sm btn-checkboxs" onClick="zFiltraMonitorSequencia(false,\'ztmDadosResProcedimentos\',\'Apaginas\',\'-1\');" disabled><span class="glyphicon glyphicon-forward"></label>';
			$_telaMonitor .= '</div>';
		$_telaMonitor .= '</div>';
		$_telaMonitor .= '<div class="estrutura_col3" style="text-align:center;">';
			$_telaMonitor .= '<div class="btn-group btn-group-sm" data-toggle="buttons">';
				$_telaMonitor .= '<input type="hidden" id="Bpaginas" name="Bpaginas" value="0">';
				$_telaMonitor .= '<label id="btnBmais" class="btn btn-default-lis btn-sm btn-checkboxs" onClick="zFiltraMonitorSequencia(false,\'ztmDadosResPacientes\',\'Bpaginas\',\'+1\');"><span class="glyphicon glyphicon-backward"></label>';
				$_telaMonitor .= '<label class="btn btn-default-lis btn-sm grafico-bots active" onClick="zFiltraMonitoramento(false,\'ztmDadosResPacientes\',\'Bpaginas\',\'N\',\'0\');"><input id="B1d" name="nomeB" type="radio" value="0"><b>Hoje</b></label>';
				$_telaMonitor .= '<label class="btn btn-default-lis btn-sm grafico-bots" onClick="zFiltraMonitoramento(false,\'ztmDadosResPacientes\',\'Bpaginas\',\'N\',\'7\');"><input id="B7d" name="nomeB" type="radio" value="7"><b>7 dias</b></label>';
				$_telaMonitor .= '<label class="btn btn-default-lis btn-sm grafico-bots" onClick="zFiltraMonitoramento(false,\'ztmDadosResPacientes\',\'Bpaginas\',\'N\',\'30\');"><input id="B1m" name="nomeB" type="radio" value="30"><b>1 mês</b></label>';
				//$_telaMonitor .= '<label class="btn btn-default-lis btn-sm" onClick="zFiltraMonitoramento(false,\'ztmDadosResPacientes\',\'Bpaginas\',\'N\',\'180\');"><input id="B6m" name="nomeB" type="radio" value="180"><b>6 meses</b></label>';
				//$_telaMonitor .= '<label class="btn btn-default-lis btn-sm" onClick="zFiltraMonitoramento(false,\'ztmDadosResPacientes\',\'Bpaginas\',\'N\',\'365\');"><input id="B1a" name="nomeB" type="radio" value="360"><b>1 ano</b></label>';
				$_telaMonitor .= '<label id="btnBmenos" class="btn btn-default-lis btn-sm btn-checkboxs" onClick="zFiltraMonitorSequencia(false,\'ztmDadosResPacientes\',\'Bpaginas\',\'-1\');" disabled><span class="glyphicon glyphicon-forward"></label>';
			$_telaMonitor .= '</div>';
		$_telaMonitor .= '</div>';
		$_telaMonitor .= '<div class="estrutura_col3" style="text-align:center;">';
			$_telaMonitor .= '<div class="btn-group btn-group-sm" data-toggle="buttons">';
				$_telaMonitor .= '<input type="hidden" id="Cpaginas" name="Cpaginas" value="0">';
				$_telaMonitor .= '<label id="btnCmais" class="btn btn-default-lis btn-sm btn-checkboxs" onClick="zFiltraMonitorSequencia(false,\'ztmDadosResFaturas\',\'Cpaginas\',\'+1\');"><span class="glyphicon glyphicon-backward"></label>';
				$_telaMonitor .= '<label class="btn btn-default-lis btn-sm grafico-bots active" onClick="zFiltraMonitoramento(false,\'ztmDadosResFaturas\',\'Cpaginas\',\'N\',\'0\');"><input id="C1d" name="nomeC" type="radio" value="0"><b>Hoje</b></label>';
				$_telaMonitor .= '<label class="btn btn-default-lis btn-sm grafico-bots" onClick="zFiltraMonitoramento(false,\'ztmDadosResFaturas\',\'Cpaginas\',\'N\',\'7\');"><input id="C7d" name="nomeC" type="radio" value="7"><b>7 dias</b></label>';
				$_telaMonitor .= '<label class="btn btn-default-lis btn-sm grafico-bots" onClick="zFiltraMonitoramento(false,\'ztmDadosResFaturas\',\'Cpaginas\',\'N\',\'30\');"><input id="C1m" name="nomeC" type="radio" value="30"><b>1 mês</b></label>';
				//$_telaMonitor .= '<label class="btn btn-default-lis btn-sm" onClick="zFiltraMonitoramento(false,\'ztmDadosResFaturas\',\'Cpaginas\',\'N\',\'180\');"><input id="C6m" name="nomeC" type="radio" value="180"><b>6 meses</b></label>';
				//$_telaMonitor .= '<label class="btn btn-default-lis btn-sm" onClick="zFiltraMonitoramento(false,\'ztmDadosResFaturas\',\'Cpaginas\',\'N\',\'365\');"><input id="C1a" name="nomeC" type="radio" value="360"><b>1 ano</b></label>';
				$_telaMonitor .= '<label id="btnCmenos" class="btn btn-default-lis btn-sm btn-checkboxs" onClick="zFiltraMonitorSequencia(false,\'ztmDadosResFaturas\',\'Cpaginas\',\'-1\');" disabled><span class="glyphicon glyphicon-forward"></label>';
			$_telaMonitor .= '</div>';
		$_telaMonitor .= '</div>';
	$_telaMonitor .= '</div>';
	echo utf8_decode($_telaMonitor);
}

if( $_GET['down'] == "ztmMonitoramentoExames" ){
	$_telaMonitor .= '<div class="row">';
		$_telaMonitor .= '<div class="estrutura_col3">';
			$_telaMonitor .= '<div class="estrutura_row">';
				$_telaMonitor .= '<div class="estrutura_col">';
					$_telaMonitor .= '<span class="grafico-tits">Resumo Diário&nbsp;</span>';
				$_telaMonitor .= '</div>';
				$_telaMonitor .= '<div class="estrutura_col">';
					$_telaMonitor .= '<div class="grafico-tits-linha"></div>';
				$_telaMonitor .= '</div>';
			$_telaMonitor .= '</div>';
			$_telaMonitor .= '<div class="estrutura_row">';
				$_telaMonitor .= '<div class="grafico-tits-lateral" style="border-left:1px #BBBBBB solid;">';
					$_telaMonitor .= '<span id="ztmExamesSubA1" class="font-sub-tit"><i>Hoje</i></span>';
					$_telaMonitor .= '<br><span id="ztmExamesHojeTT" class="font-g">0</span>&nbsp;<span class="font-pp">Total</span>';
					$_telaMonitor .= '<br><span id="ztmExamesHojeOK" class="font-m">0</span>&nbsp;<span class="font-pp">Entregue</span>';
				$_telaMonitor .= '</div>';
				$_telaMonitor .= '<div class="grafico-tits-lateral" style="">';
					$_telaMonitor .= '&nbsp;';
					$_telaMonitor .= '<br>&nbsp;';
					$_telaMonitor .= '<br>&nbsp;';
				$_telaMonitor .= '</div>';
			$_telaMonitor .= '</div>';
			$_telaMonitor .= '<div class="estrutura_row">';
				$_telaMonitor .= '<div id="ztmDadosResDiarioDiv" class="estrutura_col div-grafico-canvas" style="padding-top:10px;"></div>';
			$_telaMonitor .= '</div>';
		$_telaMonitor .= '</div>';
		$_telaMonitor .= '<div class="estrutura_col3">';
			$_telaMonitor .= '<div class="estrutura_row">';
				$_telaMonitor .= '<div class="estrutura_col">';
					$_telaMonitor .= '<span class="grafico-tits">Resumo dos Status&nbsp;</span>';
				$_telaMonitor .= '</div>';
				$_telaMonitor .= '<div class="estrutura_col">';
					$_telaMonitor .= '<div class="grafico-tits-linha"></div>';
				$_telaMonitor .= '</div>';
			$_telaMonitor .= '</div>';
			$_telaMonitor .= '<div class="estrutura_row">';
				$_telaMonitor .= '<div class="grafico-tits-lateral" style="border-left:1px #BBBBBB solid;">';
					$_telaMonitor .= '<span id="ztmStatusExaStatusSubA1" class="font-sub-tit"><i>Pendencias<br>Agora</i></span>';
					$_telaMonitor .= '<br><span id="ztmStatusExaPendenteTT" class="font-g">0</span>&nbsp;<span class="font-pp">Total</span>';
				$_telaMonitor .= '</div>';
				$_telaMonitor .= '<div class="grafico-tits-lateral" style="border-left:1px #BBBBBB solid;">';
					$_telaMonitor .= '<br><span id="ztmStatusExaDeveTT" class="font-g">0</span>&nbsp;<span class="font-pp">Deve</span>';
					$_telaMonitor .= '<br><span id="ztmStatusExaNovaColetaTT" class="font-g">0</span>&nbsp;<span class="font-pp">Nova Coleta</span>';
				$_telaMonitor .= '</div>';
			$_telaMonitor .= '</div>';
			$_telaMonitor .= '<div class="estrutura_row">';
				$_telaMonitor .= '<div id="ztmDadosResStatusExamesDiv" class="estrutura_col div-grafico-canvas" style="padding-top:10px;"></div>';
			$_telaMonitor .= '</div>';
		$_telaMonitor .= '</div>';
		$_telaMonitor .= '<div class="estrutura_col3">';
			$_telaMonitor .= '<div class="estrutura_row">';
				$_telaMonitor .= '<div class="estrutura_col">';
					$_telaMonitor .= '<span class="grafico-tits">Resumo de Pendências&nbsp;</span>';
				$_telaMonitor .= '</div>';
				$_telaMonitor .= '<div class="estrutura_col">';
					$_telaMonitor .= '<div class="grafico-tits-linha"></div>';
				$_telaMonitor .= '</div>';
			$_telaMonitor .= '</div>';
			$_telaMonitor .= '<div class="estrutura_row">';
				$_telaMonitor .= '<div class="grafico-tits-lateral" style="border-left:1px #BBBBBB solid;">';
					$_telaMonitor .= '<span id="ztmPendenciasSubA1" class="font-sub-tit"><i>Hoje</i></span>';
					$_telaMonitor .= '<br><span id="ztmPendenciasTTA" class="font-g">0</span>&nbsp;<span class="glyphicon glyphicon-stop" style="color:#DC3912;"></span>&nbsp;<span class="font-pp">Mais de 3 Horas</span>';
					$_telaMonitor .= '<br><span id="ztmPendenciasTTC" class="font-g">0</span>&nbsp;<span class="glyphicon glyphicon-stop" style="color:#FFFF08;"></span>&nbsp;<span class="font-pp">Até 2 Horas</span>';
				$_telaMonitor .= '</div>';
				$_telaMonitor .= '<div class="grafico-tits-lateral" style="">';
					$_telaMonitor .= '<span class="font-sub-tit">&nbsp;</span>';
					$_telaMonitor .= '<br><span id="ztmPendenciasTTB" class="font-g">0</span>&nbsp;<span class="glyphicon glyphicon-stop" style="color:#FF9900;"></span>&nbsp;<span class="font-pp">Até 3 Horas</span>';
					$_telaMonitor .= '<br><span id="ztmPendenciasTTD" class="font-g">0</span>&nbsp;<span class="glyphicon glyphicon-stop" style="color:#109618;"></span>&nbsp;<span class="font-pp">Até 1 Hora</span>';
				$_telaMonitor .= '</div>';
				$_telaMonitor .= '<div class="estrutura_row">';
					$_telaMonitor .= '<div id="ztmDadosResPendenciasDiv" class="estrutura_col div-grafico-canvas" style="padding-top:10px;"></div>';
				$_telaMonitor .= '</div>';
			$_telaMonitor .= '</div>';
		$_telaMonitor .= '</div>';
	$_telaMonitor .= '</div>';
	$_telaMonitor .= '<div class="row">';
		$_telaMonitor .= '<div class="estrutura_col3" style="text-align:center;">';
			$_telaMonitor .= '<div class="btn-group btn-group-sm" data-toggle="buttons">';
				$_telaMonitor .= '<input type="hidden" id="Apaginas" name="Apaginas" value="0">';
				$_telaMonitor .= '<label id="btnAmais" class="btn btn-default-lis btn-sm btn-checkboxs" onClick="zFiltraMonitorSequencia(false,\'ztmDadosResDiario\',\'Apaginas\',\'+1\');"><span class="glyphicon glyphicon-backward"></label>';
				$_telaMonitor .= '<label class="btn btn-default-lis btn-sm grafico-bots active" onClick="zFiltraMonitoramento(false,\'ztmDadosResDiario\',\'Apaginas\',\'N\',\'0\');"><input id="A1d" name="nomeA" type="radio" value="0"><b>Hoje</b></label>';
				$_telaMonitor .= '<label class="btn btn-default-lis btn-sm grafico-bots" onClick="zFiltraMonitoramento(false,\'ztmDadosResDiario\',\'Apaginas\',\'N\',\'7\');"><input id="A7d" name="nomeA" type="radio" value="7"><b>7 dias</b></label>';
				$_telaMonitor .= '<label class="btn btn-default-lis btn-sm grafico-bots" onClick="zFiltraMonitoramento(false,\'ztmDadosResDiario\',\'Apaginas\',\'N\',\'30\');"><input id="A1m" name="nomeA" type="radio" value="30"><b>1 mês</b></label>';
				//$_telaMonitor .= '<label class="btn btn-default-lis btn-sm" onClick="zFiltraMonitoramento(false,\'ztmDadosResDiario\',\'Apaginas\',\'N\',\'180\');"><input id="A6m" name="nomeA" type="radio" value="180"><b>6 meses</b></label>';
				//$_telaMonitor .= '<label class="btn btn-default-lis btn-sm" onClick="zFiltraMonitoramento(false,\'ztmDadosResDiario\',\'Apaginas\',\'N\',\'365\');"><input id="A1a" name="nomeA" type="radio" value="360"><b>1 ano</b></label>';
				$_telaMonitor .= '<label id="btnAmenos" class="btn btn-default-lis btn-sm btn-checkboxs" onClick="zFiltraMonitorSequencia(false,\'ztmDadosResDiario\',\'Apaginas\',\'-1\');" disabled><span class="glyphicon glyphicon-forward"></label>';
			$_telaMonitor .= '</div>';
		$_telaMonitor .= '</div>';
		$_telaMonitor .= '<div class="estrutura_col3" style="text-align:center;">';
			$_telaMonitor .= '<div class="btn-group btn-group-sm" data-toggle="buttons">';
				$_telaMonitor .= '<input type="hidden" id="Bpaginas" name="Bpaginas" value="0">';
				$_telaMonitor .= '<label id="btnBmais" class="btn btn-default-lis btn-sm btn-checkboxs" onClick="zFiltraMonitorSequencia(false,\'ztmDadosResStatusExames\',\'Bpaginas\',\'+1\');"><span class="glyphicon glyphicon-backward"></label>';
				$_telaMonitor .= '<label class="btn btn-default-lis btn-sm grafico-bots active" onClick="zFiltraMonitoramento(false,\'ztmDadosResStatusExames\',\'Bpaginas\',\'N\',\'0\');"><input id="B1d" name="nomeB" type="radio" value="0"><b>Hoje</b></label>';
				$_telaMonitor .= '<label class="btn btn-default-lis btn-sm grafico-bots" onClick="zFiltraMonitoramento(false,\'ztmDadosResStatusExames\',\'Bpaginas\',\'N\',\'7\');"><input id="B7d" name="nomeB" type="radio" value="7"><b>7 dias</b></label>';
				$_telaMonitor .= '<label class="btn btn-default-lis btn-sm grafico-bots" onClick="zFiltraMonitoramento(false,\'ztmDadosResStatusExames\',\'Bpaginas\',\'N\',\'30\');"><input id="B1m" name="nomeB" type="radio" value="30"><b>1 mês</b></label>';
				//$_telaMonitor .= '<label class="btn btn-default-lis btn-sm" onClick="zFiltraMonitoramento(false,\'ztmDadosResStatusExames\',\'Bpaginas\',\'N\',\'180\');"><input id="B6m" name="nomeB" type="radio" value="180"><b>6 meses</b></label>';
				//$_telaMonitor .= '<label class="btn btn-default-lis btn-sm" onClick="zFiltraMonitoramento(false,\'ztmDadosResStatusExames\',\'Bpaginas\',\'N\',\'365\');"><input id="B1a" name="nomeB" type="radio" value="360"><b>1 ano</b></label>';
				$_telaMonitor .= '<label id="btnBmenos" class="btn btn-default-lis btn-sm btn-checkboxs" onClick="zFiltraMonitorSequencia(false,\'ztmDadosResStatusExames\',\'Bpaginas\',\'-1\');" disabled><span class="glyphicon glyphicon-forward"></label>';
			$_telaMonitor .= '</div>';
		$_telaMonitor .= '</div>';
		$_telaMonitor .= '<div class="estrutura_col3" style="text-align:center;">';
			$_telaMonitor .= '<div class="btn-group btn-group-sm" data-toggle="buttons">';
				$_telaMonitor .= '<input type="hidden" id="Cpaginas" name="Cpaginas" value="0">';
				$_telaMonitor .= '<label id="btnCmais" class="btn btn-default-lis btn-sm btn-checkboxs" onClick="zFiltraMonitorSequencia(false,\'ztmDadosResPendencias\',\'Cpaginas\',\'+1\');"><span class="glyphicon glyphicon-backward"></label>';
				$_telaMonitor .= '<label class="btn btn-default-lis btn-sm grafico-bots active" onClick="zFiltraMonitoramento(false,\'ztmDadosResPendencias\',\'Cpaginas\',\'N\',\'0\');"><input id="C1d" name="nomeC" type="radio" value="0"><b>Hoje</b></label>';
				$_telaMonitor .= '<label class="btn btn-default-lis btn-sm grafico-bots" onClick="zFiltraMonitoramento(false,\'ztmDadosResPendencias\',\'Cpaginas\',\'N\',\'7\');"><input id="C7d" name="nomeC" type="radio" value="7"><b>7 dias</b></label>';
				$_telaMonitor .= '<label class="btn btn-default-lis btn-sm grafico-bots" onClick="zFiltraMonitoramento(false,\'ztmDadosResPendencias\',\'Cpaginas\',\'N\',\'30\');"><input id="C1m" name="nomeC" type="radio" value="30"><b>1 mês</b></label>';
				//$_telaMonitor .= '<label class="btn btn-default-lis btn-sm" onClick="zFiltraMonitoramento(false,\'ztmDadosResPendencias\',\'Cpaginas\',\'N\',\'180\');"><input id="C6m" name="nomeC" type="radio" value="180"><b>6 meses</b></label>';
				//$_telaMonitor .= '<label class="btn btn-default-lis btn-sm" onClick="zFiltraMonitoramento(false,\'ztmDadosResPendencias\',\'Cpaginas\',\'N\',\'365\');"><input id="C1a" name="nomeC" type="radio" value="360"><b>1 ano</b></label>';
				$_telaMonitor .= '<label id="btnCmenos" class="btn btn-default-lis btn-sm btn-checkboxs" onClick="zFiltraMonitorSequencia(false,\'ztmDadosResPendencias\',\'Cpaginas\',\'-1\');" disabled><span class="glyphicon glyphicon-forward"></label>';
			$_telaMonitor .= '</div>';
		$_telaMonitor .= '</div>';
	$_telaMonitor .= '</div>';
	echo utf8_decode($_telaMonitor);
}

if( $_GET['down'] == "ztmMonitoramentoSetores" ){
	$_telaMonitor .= '<div class="row">';
		$_telaMonitor .= '<div class="estrutura_grid">';
			$_telaMonitor .= '<div class="estrutura_row">';
				$_telaMonitor .= '<div class="estrutura_col">';
					$_telaMonitor .= '<span class="grafico-tits">Resumo Pendências por Setor&nbsp;</span>';
				$_telaMonitor .= '</div>';
				$_telaMonitor .= '<div class="estrutura_col">';
					$_telaMonitor .= '<div class="grafico-tits-linha"></div>';
				$_telaMonitor .= '</div>';
			$_telaMonitor .= '</div>';
			$_telaMonitor .= '<div class="estrutura_row"><br>';
				$_telaMonitor .= '<div id="ztmDadosResStatusLiberaDiv" class="estrutura_grid div-grafico-canvas" style="padding-top:10px;"></div>';
			$_telaMonitor .= '</div>';
		$_telaMonitor .= '</div>';
	$_telaMonitor .= '</div>';
	$_telaMonitor .= '<div class="row">';
		$_telaMonitor .= '<div class="estrutura_grid" style="text-align:center;">';
			$_telaMonitor .= '<br><br><br><span class="glyphicon glyphicon-stop" style="color:#DC3912;"></span>&nbsp;<span class="font-sub-tit">Atrasado</span>';
			$_telaMonitor .= '&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-stop" style="color:#FFFF08;;"></span>&nbsp;<span class="font-sub-tit">Hoje</span>';
			$_telaMonitor .= '&nbsp;&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-stop" style="color:#00FF40"></span>&nbsp;<span class="font-sub-tit">Entrega Futura</span>';
		$_telaMonitor .= '</div>';
	$_telaMonitor .= '</div>';
	echo utf8_decode($_telaMonitor);
}
?>
