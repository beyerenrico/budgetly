<script>
	import { Pencil, Plus, Trash } from 'tabler-icons-svelte';
</script>

<header>
	<hgroup>
		<h1 class="icon">
			Haushaltsbuch 2019
			<a
				href="/haushaltsbuecher/1/edit"
				role="button"
				class="small"
				data-tooltip="Haushaltsbuch bearbeiten"
			>
				<Pencil strokeWidth={1} />
			</a>
		</h1>
		<h2>Lorem ipsum dolor sit amet</h2>
	</hgroup>
</header>
<main>
	<div class="container-fluid">
		<section>
			<figure>
				<table class="numbers" summary="...">
					<thead>
						<tr>
							<th />
							<th id="jan" scope="col"> Januar </th>
							<th id="feb" scope="col"> Feburar </th>
							<th id="mar" scope="col"> März </th>
							<th id="apr" scope="col"> April </th>
							<th id="may" scope="col"> Mai </th>
							<th id="jun" scope="col"> Juni </th>
							<th id="jul" scope="col"> Juli </th>
							<th id="aug" scope="col"> August </th>
							<th id="sep" scope="col"> September </th>
							<th id="oct" scope="col"> Oktober </th>
							<th id="nov" scope="col"> November </th>
							<th id="dec" scope="col"> Dezember </th>
							<th id="actions" scope="col" />
						</tr>
					</thead>
					<tbody>
						<tr>
							<th id="einkommen" class="span" colspan="13" scope="colgroup"> Einkommen </th>

							<th
								><a href="/posten/new" data-tooltip="Posten hinzufügen" role="button" class="small">
									<Plus strokeWidth={1} />
								</a></th
							>
						</tr>
						<tr>
							<th headers="einkommen" id="gehalt"> Gehalt </th>
							<td headers="einkommen gehalt jan"> 3000,00 € </td>
							<td headers="einkommen gehalt feb"> 3000,00 € </td>
							<td headers="einkommen gehalt mar"> 3000,00 € </td>
							<td headers="einkommen gehalt apr"> 3000,00 € </td>
							<td headers="einkommen gehalt may"> 3000,00 € </td>
							<td headers="einkommen gehalt jun"> 3000,00 € </td>
							<td headers="einkommen gehalt jul"> 3000,00 € </td>
							<td headers="einkommen gehalt aug"> 3000,00 € </td>
							<td headers="einkommen gehalt sep"> 3000,00 € </td>
							<td headers="einkommen gehalt oct"> 3000,00 € </td>
							<td headers="einkommen gehalt nov"> 3000,00 € </td>
							<td headers="einkommen gehalt dec"> 3000,00 € </td>
							<th headers="einkommen gehalt actions">
								<a
									href="/posten/1/edit"
									data-tooltip="Posten bearbeiten"
									role="button"
									class="small"
								>
									<Pencil strokeWidth={1} />
								</a>
								<a
									href="/posten/1/delete"
									data-tooltip="Posten löschen"
									role="button"
									class="small danger"
								>
									<Trash strokeWidth={1} />
								</a>
							</th>
						</tr>
						<tr>
							<th headers="einkommen" id="bonus"> Bonus </th>
							<td headers="einkommen bonus jan"> 700,00 € </td>
							<td headers="einkommen bonus feb"> 0,00 € </td>
							<td headers="einkommen bonus mar"> 0,00 € </td>
							<td headers="einkommen bonus apr"> 500,00 € </td>
							<td headers="einkommen bonus may"> 0,00 € </td>
							<td headers="einkommen bonus jun"> 0,00 € </td>
							<td headers="einkommen bonus jul"> 899,00 € </td>
							<td headers="einkommen bonus aug"> 0,00 € </td>
							<td headers="einkommen bonus sep"> 0,00 € </td>
							<td headers="einkommen bonus oct"> 506,00 € </td>
							<td headers="einkommen bonus nov"> 0,00 € </td>
							<td headers="einkommen bonus dec"> 0,00 € </td>
							<th headers="einkommen bonus actions">
								<a
									href="/posten/1/edit"
									data-tooltip="Posten bearbeiten"
									role="button"
									class="small"
								>
									<Pencil strokeWidth={1} />
								</a>
								<a
									href="/posten/1/delete"
									data-tooltip="Posten löschen"
									role="button"
									class="small danger"
								>
									<Trash strokeWidth={1} />
								</a>
							</th>
						</tr>
						<tr>
							<th id="lebenshaltung" class="span" colspan="13" scope="colgroup"> Lebenshaltung </th>
							<th
								><a href="/posten/new" data-tooltip="Posten hinzufügen" role="button" class="small">
									<Plus strokeWidth={1} />
								</a></th
							>
						</tr>
						<tr>
							<th headers="lebenshaltung" id="miete"> Miete </th>
							<td headers="lebenshaltung miete jan"> 820,00 € </td>
							<td headers="lebenshaltung miete feb"> 820,00 € </td>
							<td headers="lebenshaltung miete mar"> 820,00 € </td>
							<td headers="lebenshaltung miete apr"> 820,00 € </td>
							<td headers="lebenshaltung miete may"> 820,00 € </td>
							<td headers="lebenshaltung miete jun"> 820,00 € </td>
							<td headers="lebenshaltung miete jul"> 820,00 € </td>
							<td headers="lebenshaltung miete aug"> 820,00 € </td>
							<td headers="lebenshaltung miete sep"> 820,00 € </td>
							<td headers="lebenshaltung miete oct"> 820,00 € </td>
							<td headers="lebenshaltung miete nov"> 820,00 € </td>
							<td headers="lebenshaltung miete dec"> 820,00 € </td>
							<th headers="lebenshaltung miete actions">
								<a
									href="/posten/1/edit"
									data-tooltip="Posten bearbeiten"
									role="button"
									class="small"
								>
									<Pencil strokeWidth={1} />
								</a>
								<a
									href="/posten/1/delete"
									data-tooltip="Posten löschen"
									role="button"
									class="small danger"
								>
									<Trash strokeWidth={1} />
								</a>
							</th>
						</tr>
						<tr>
							<th headers="lebenshaltung" id="strom"> Strom </th>
							<td headers="lebenshaltung strom jan"> 148,00 € </td>
							<td headers="lebenshaltung strom feb"> 148,00 € </td>
							<td headers="lebenshaltung strom mar"> 148,00 € </td>
							<td headers="lebenshaltung strom apr"> 148,00 € </td>
							<td headers="lebenshaltung strom may"> 148,00 € </td>
							<td headers="lebenshaltung strom jun"> 148,00 € </td>
							<td headers="lebenshaltung strom jul"> 148,00 € </td>
							<td headers="lebenshaltung strom aug"> 148,00 € </td>
							<td headers="lebenshaltung strom sep"> 148,00 € </td>
							<td headers="lebenshaltung strom oct"> 148,00 € </td>
							<td headers="lebenshaltung strom nov"> 148,00 € </td>
							<td headers="lebenshaltung strom dec"> 148,00 € </td>
							<th headers="lebenshaltung strom actions">
								<a
									href="/posten/1/edit"
									data-tooltip="Posten bearbeiten"
									role="button"
									class="small"
								>
									<Pencil strokeWidth={1} />
								</a>
								<a
									href="/posten/1/delete"
									data-tooltip="Posten löschen"
									role="button"
									class="small danger"
								>
									<Trash strokeWidth={1} />
								</a>
							</th>
						</tr>
						<tr>
							<th headers="lebenshaltung" id="gas"> Gas </th>
							<td headers="lebenshaltung gas jan"> 178,00 € </td>
							<td headers="lebenshaltung gas feb"> 178,00 € </td>
							<td headers="lebenshaltung gas mar"> 178,00 € </td>
							<td headers="lebenshaltung gas apr"> 178,00 € </td>
							<td headers="lebenshaltung gas may"> 178,00 € </td>
							<td headers="lebenshaltung gas jun"> 178,00 € </td>
							<td headers="lebenshaltung gas jul"> 178,00 € </td>
							<td headers="lebenshaltung gas aug"> 178,00 € </td>
							<td headers="lebenshaltung gas sep"> 178,00 € </td>
							<td headers="lebenshaltung gas oct"> 178,00 € </td>
							<td headers="lebenshaltung gas nov"> 178,00 € </td>
							<td headers="lebenshaltung gas dec"> 178,00 € </td>
							<th headers="lebenshaltung gas actions">
								<a
									href="/posten/1/edit"
									data-tooltip="Posten bearbeiten"
									role="button"
									class="small"
								>
									<Pencil strokeWidth={1} />
								</a>
								<a
									href="/posten/1/delete"
									data-tooltip="Posten löschen"
									role="button"
									class="small danger"
								>
									<Trash strokeWidth={1} />
								</a>
							</th>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<th id="gesamt-ausgaben" class="span" colspan="14" scope="colgroup">
								Gesamtausgaben
							</th>
						</tr>
						<tr>
							<th headers="gesamt-ausgaben" id="saldo"> Saldo </th>
							<td headers="gesamt-ausgaben saldo jan"> 940,00 € </td>
							<td headers="gesamt-ausgaben saldo feb"> 940,00 € </td>
							<td headers="gesamt-ausgaben saldo mar"> 940,00 € </td>
							<td headers="gesamt-ausgaben saldo apr"> 940,00 € </td>
							<td headers="gesamt-ausgaben saldo may"> 940,00 € </td>
							<td headers="gesamt-ausgaben saldo jun"> 940,00 € </td>
							<td headers="gesamt-ausgaben saldo jul"> 940,00 € </td>
							<td headers="gesamt-ausgaben saldo aug"> 940,00 € </td>
							<td headers="gesamt-ausgaben saldo sep"> 940,00 € </td>
							<td headers="gesamt-ausgaben saldo oct"> 940,00 € </td>
							<td headers="gesamt-ausgaben saldo nov"> 940,00 € </td>
							<td headers="gesamt-ausgaben saldo dec"> 940,00 € </td>
							<td />
						</tr>
					</tfoot>
				</table>
			</figure>
		</section>
	</div>
</main>

<style lang="scss">
	article {
		padding-top: 1rem;
		padding-bottom: 0;
		padding-left: 0;
		padding-right: 0;

		&.new {
			height: 100px;

			@media (min-width: 768px) {
				height: 200px;
			}
		}
	}

	th {
		width: 400px;
	}

	section {
		h2 {
			margin-bottom: 1rem;
		}

		article {
			margin-top: 0;
		}
	}

	hr {
		margin-bottom: 1rem;

		@media screen and (min-width: 768px) {
			margin-bottom: 2rem;
		}

		@media screen and (min-width: 1024px) {
			margin-bottom: 3rem;
		}
	}

	th {
		background-color: #121212;
	}

	table {
		overflow: hidden;
		margin-bottom: 0;
	}

	td,
	th {
		position: relative;
	}

	//Row
	td:hover::before {
		background-color: #0a0a0a;
		content: '';
		height: 100%;
		left: -5000px;
		position: absolute;
		top: 0;
		width: 10000px;
		z-index: -2;
	}

	//Column
	td:hover::after {
		background-color: #0a0a0a;
		content: '';
		height: 10000px;
		left: 0;
		position: absolute;
		top: -5000px;
		width: 100%;
		z-index: -1;
	}
</style>
